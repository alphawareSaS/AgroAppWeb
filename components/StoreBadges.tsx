import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_STORE_URL, PLAY_STORE_URL } from '../services/appStores';

// Insignias oficiales de Apple y Google (public/badges), en el idioma de la página.
const BADGE_LANGS = ['es', 'en', 'pt'];

interface StoreBadgesProps {
  className?: string;
}

const StoreBadges: React.FC<StoreBadgesProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || 'es').slice(0, 2);
  const code = BADGE_LANGS.includes(lang) ? lang : 'es';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src={`/badges/app-store-${code}.svg`}
          alt={t('download.app_store')}
          width={144}
          height={48}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src={`/badges/google-play-${code}.png`}
          alt={t('download.google_play')}
          width={161}
          height={48}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
};

export default StoreBadges;
