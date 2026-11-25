import { useEffect, useState } from 'react';
import { detectMobileOS, storeUrlFor, DOWNLOAD_SECTION_ID, type MobileOS } from '../services/appStores';

/**
 * A dónde lleva "Descargar la app": App Store en iPhone/iPad, Google Play en
 * Android y, en computador, a la sección con las dos insignias.
 */
export const useAppDownload = () => {
  const [os, setOs] = useState<MobileOS>(null);

  useEffect(() => {
    setOs(detectMobileOS());
  }, []);

  return {
    os,
    downloadHref: storeUrlFor(os) ?? `#${DOWNLOAD_SECTION_ID}`,
  };
};
