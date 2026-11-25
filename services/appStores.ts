// Enlaces de descarga de la app nativa y detección del celular del visitante.

export const APP_STORE_URL = 'https://apps.apple.com/app/gania/id6838457663';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.alphaware.gania';

/** Sección de la página con las dos insignias (destino en computador). */
export const DOWNLOAD_SECTION_ID = 'descargar';

export type MobileOS = 'ios' | 'android' | null;

/**
 * iPhone/iPad o Android; null en computador.
 * El iPad con iPadOS se presenta como Mac, pero con pantalla táctil.
 */
export function detectMobileOS(): MobileOS {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
  return null;
}

/** Tienda que corresponde al celular; null en computador. */
export function storeUrlFor(os: MobileOS): string | null {
  if (os === 'ios') return APP_STORE_URL;
  if (os === 'android') return PLAY_STORE_URL;
  return null;
}
