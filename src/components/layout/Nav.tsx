'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { Logo } from './Logo';
import { LocaleSwitch } from './LocaleSwitch';
import { isActive, navLinks } from './navLinks';

/**
 * Nav desktop : barre blanche arrondie avec ombre, liens soulignés au survol,
 * lien actif en pill encre, bouton FR / EN. Descend en glissant au premier chargement.
 */
export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="hidden animate-nav-in px-4 pt-5 lg:block">
      <nav
        aria-label={t('label')}
        className="mx-auto flex max-w-site items-center justify-between gap-3 rounded-[28px] border-2 bg-blanc py-2.5 pr-3 pl-4.5 shadow-dure"
      >
        <Link href="/" aria-label={t('homeLabel')} className="group/logo">
          <Logo />
        </Link>

        <ul className="flex gap-0.5 text-[15px] font-medium">
          {navLinks.map(({ key, href }) => {
            const active = isActive(pathname, href);
            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cx(
                    'relative inline-flex min-h-11 items-center rounded-full px-3.5',
                    active
                      ? 'bg-encre text-papier'
                      : cx(
                          'after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current',
                          'after:transition-[scale] after:duration-250 after:ease-out hover:after:scale-x-100',
                        ),
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <LocaleSwitch
          label="both"
          className="inline-flex min-h-11 items-center rounded-full border-2 bg-blanc px-3.5 font-mono text-[13px] font-semibold transition-colors duration-150 hover:bg-citron"
        />
      </nav>
    </header>
  );
}
