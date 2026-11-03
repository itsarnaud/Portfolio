'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type LocaleSwitchProps = {
  /** Texte affiché : « FR / EN » dans la nav desktop, « EN » dans le menu mobile. */
  label: 'both' | 'other';
  className?: string;
};

/** Lien vers la même page dans l'autre langue. Un vrai lien, pour que Google le suive aussi. */
export function LocaleSwitch({ label, className }: LocaleSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      aria-label={t('switchLocale')}
      data-transition-label={t('otherLocale')}
      className={className}
    >
      {label === 'both' ? t('locales') : t('otherLocale')}
    </Link>
  );
}
