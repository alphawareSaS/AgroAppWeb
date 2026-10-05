import { supabase } from './supabaseClient';

/** Códigos estables (no traducidos) para que la BD no mezcle idiomas. */
export const OCCUPATION_CODES = ['ganadero', 'agricultor', 'mixto', 'tecnico', 'otro'] as const;
export const INTEREST_CODES = [
  'reducir_costos',
  'aumentar_produccion',
  'controlar_finca',
  'detectar_problemas',
] as const;

export type OccupationCode = (typeof OCCUPATION_CODES)[number];
export type InterestCode = (typeof INTEREST_CODES)[number];

/** Fecha de la versión del Aviso de Privacidad que el usuario acepta. */
export const PRIVACY_NOTICE_VERSION = '2026-01-12';

export interface LeadPayload {
  name: string;
  email: string;
  /** Celular ya normalizado en formato E.164 (+573001234567). */
  whatsapp: string;
  city: string;
  occupation?: OccupationCode | '';
  interest?: InterestCode | '';
  privacyConsent: boolean;
  lang?: string;
  /** Token de Cloudflare Turnstile; si viene, el lead va por la Edge Function submit_lead. */
  turnstileToken?: string;
}

export type SaveLeadErrorCode = 'not_configured' | 'invalid' | 'captcha' | 'network';

export interface SaveLeadResult {
  ok: boolean;
  errorCode?: SaveLeadErrorCode;
}

// ─── Validación y normalización ───────────────────────────────────────────────

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const URL_RE = /(https?:\/\/|www\.)/i;

export function isValidEmail(email: string): boolean {
  const e = email.trim();
  return e.length <= 254 && EMAIL_RE.test(e);
}

export function isValidName(name: string): boolean {
  const n = name.trim();
  return n.length >= 3 && n.length <= 120 && /\p{L}/u.test(n) && !URL_RE.test(n) && !/[<>]/.test(n);
}

/**
 * Normaliza un celular a E.164 a partir del indicativo elegido.
 * Devuelve null si el número no es plausible.
 * - Quita espacios, guiones, paréntesis y ceros iniciales.
 * - Si el usuario ya escribió el indicativo, no lo duplica.
 * - Colombia (+57): exige 10 dígitos que empiecen por 3 (celular).
 */
export function normalizePhone(raw: string, dialCode: string): string | null {
  const dial = dialCode.replace(/\D/g, '');
  let digits = raw.replace(/\D/g, '');
  if (!digits) return null;

  if (/^\s*(\+|00)/.test(raw)) {
    // El usuario escribió el número internacional completo.
    digits = digits.replace(/^00/, '');
    if (!digits.startsWith(dial)) {
      return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
    }
    digits = digits.slice(dial.length);
  } else if (dial === '57' && digits.length === 12 && digits.startsWith('57')) {
    digits = digits.slice(2);
  }
  digits = digits.replace(/^0+/, '');

  if (dial === '57') {
    if (!/^3\d{9}$/.test(digits)) return null;
  } else if (digits.length < 7 || digits.length > 12) {
    return null;
  }
  return `+${dial}${digits}`;
}

// ─── Persistencia ────────────────────────────────────────────────────────────

/**
 * Guarda un lead en la tabla `leads` de Supabase.
 * No interrumpe el flujo si Supabase no está configurado o falla:
 * devuelve { ok: false, errorCode } y el caller decide qué mostrar.
 * Nunca se muestra al usuario el mensaje técnico de la BD.
 */
export async function saveLead(payload: LeadPayload): Promise<SaveLeadResult> {
  if (!supabase) {
    return { ok: false, errorCode: 'not_configured' };
  }

  const base = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase() || null,
    whatsapp: payload.whatsapp,
    city: payload.city.trim() || null,
    occupation: payload.occupation || null,
    interest: payload.interest || null,
    source: 'web_landing',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 500) : null,
    page_url: typeof window !== 'undefined' ? window.location.href.slice(0, 1000) : null,
  };

  // Columnas agregadas por la migración 20261005_leads_validation.sql.
  const withConsent = {
    ...base,
    privacy_consent: payload.privacyConsent,
    privacy_notice_version: PRIVACY_NOTICE_VERSION,
    lang: payload.lang?.slice(0, 10) || null,
  };

  if (payload.turnstileToken) {
    return saveLeadViaEdgeFunction({ ...withConsent, turnstile_token: payload.turnstileToken });
  }

  try {
    let { error } = await supabase.from('leads').insert(withConsent);

    // Compatibilidad mientras la migración no esté aplicada en producción:
    // PostgREST responde PGRST204 si una columna no existe todavía.
    if (error && error.code === 'PGRST204') {
      ({ error } = await supabase.from('leads').insert(base));
    }

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Error guardando lead:', error.code, error.message);
      // 23514 = check_violation, 22001 = valor demasiado largo, P0001 = raise del trigger
      const invalid = ['23514', '22001', '23502', 'P0001'].includes(error.code ?? '');
      return { ok: false, errorCode: invalid ? 'invalid' : 'network' };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    // eslint-disable-next-line no-console
    console.error('[Supabase] Excepción guardando lead:', message);
    return { ok: false, errorCode: 'network' };
  }
}

/**
 * Envío protegido con Turnstile: la Edge Function verifica el token con
 * Cloudflare antes de insertar. Es el camino cuando hay VITE_TURNSTILE_SITE_KEY.
 */
async function saveLeadViaEdgeFunction(body: Record<string, unknown>): Promise<SaveLeadResult> {
  if (!supabase) return { ok: false, errorCode: 'not_configured' };
  try {
    const { error } = await supabase.functions.invoke('submit_lead', { body });
    if (!error) return { ok: true };

    let code = '';
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response) {
      try {
        code = (await context.json())?.code ?? '';
      } catch {
        // respuesta sin JSON: se trata como error de red
      }
    }
    // eslint-disable-next-line no-console
    console.error('[submit_lead] Error:', code || error.message);
    if (code === 'invalid') return { ok: false, errorCode: 'invalid' };
    if (code === 'captcha_failed') return { ok: false, errorCode: 'captcha' };
    return { ok: false, errorCode: 'network' };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[submit_lead] Excepción:', err instanceof Error ? err.message : err);
    return { ok: false, errorCode: 'network' };
  }
}
