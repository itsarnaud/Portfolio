'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm tracking-widest text-muted-foreground mb-6">{t('badge')}</p>
      <h1 className="text-4xl md:text-6xl font-display mb-6">{t('title')}</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-md">{t('subtitle')}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
      >
        {t('back')}
      </Link>
    </div>
  );
}
