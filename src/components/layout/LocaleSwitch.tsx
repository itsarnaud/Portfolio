'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type LocaleSwitchProps = {
  label: 'both' | 'other';
  className?: string;
};

export function LocaleSwitch({ label, className }: LocaleSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const other = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;
  const text = label === 'both' ? t('locales') : t('otherLocale');

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      // Le nom commence par le texte visible : la commande vocale « clique sur EN » doit marcher.
      aria-label={`${text}, ${t('switchLocale')}`}
      data-transition-label={t('otherLocale')}
      className={className}
    >
      {text}
    </Link>
  );
}
