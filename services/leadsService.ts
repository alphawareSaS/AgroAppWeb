import { supabase } from './supabaseClient';

export interface LeadPayload {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  occupation?: string;
  interest?: string;
}

export interface SaveLeadResult {
  ok: boolean;
  error?: string;
}

/**
 * Guarda un lead en la tabla `leads` de Supabase.
 * No interrumpe el flujo si Supabase no está configurado o falla:
 * devuelve { ok: false } y el caller decide qué hacer.
 */
export async function saveLead(payload: LeadPayload): Promise<SaveLeadResult> {
  if (!supabase) {
    return { ok: false, error: 'Supabase no configurado' };
  }

  try {
    const { error } = await supabase.from('leads').insert({
      name: payload.name?.trim() || null,
      email: payload.email?.trim().toLowerCase() || null,
      whatsapp: payload.whatsapp?.trim() || null,
      city: payload.city?.trim() || null,
      occupation: payload.occupation?.trim() || null,
      interest: payload.interest?.trim() || null,
      source: 'web_landing',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      page_url: typeof window !== 'undefined' ? window.location.href : null,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Error guardando lead:', error.message);
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    // eslint-disable-next-line no-console
    console.error('[Supabase] Excepción guardando lead:', message);
    return { ok: false, error: message };
  }
}
