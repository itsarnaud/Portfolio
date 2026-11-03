'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { Logo } from './Logo';
import { LocaleSwitch } from './LocaleSwitch';
import { GITHUB_URL, LINKEDIN_URL, isActive, navLinks } from './navLinks';

/** Légère inclinaison du lien actif, différente selon sa place. */
const ACTIVE_ROTATIONS = [-2, 1, -1, 2, -1, 1];

const pressable =
  'border-2 shadow-dure-sm transition-[translate,box-shadow] duration-150 ease-out active:translate-0.75 active:shadow-none';

/**
 * Nav mobile : le logo et un bouton menu. Le menu est un <dialog> plein écran violet
 * qui s'ouvre en cercle depuis le bouton, avec les liens qui arrivent un par un.
 * Le <dialog> natif gère Échap, le focus gardé à l'intérieur et le retour du focus au bouton.
 */
export function MobileNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = () => {
    const dialog = dialogRef.current;
    const button = buttonRef.current;
    if (!dialog || !button) return;
    // Le cercle part du centre du bouton menu.
    const rect = button.getBoundingClientRect();
    dialog.style.setProperty('--menu-x', `${rect.left + rect.width / 2}px`);
    dialog.style.setProperty('--menu-y', `${rect.top + rect.height / 2}px`);
    dialog.removeAttribute('data-closing');
    dialog.showModal();
    button.setAttribute('aria-expanded', 'true');
  };

  /** Ferme avec l'animation inverse. `instant` pour une navigation : la transition de page prend le relais. */
  const close = (instant = false) => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    buttonRef.current?.setAttribute('aria-expanded', 'false');
    if (instant) {
      dialog.close();
      return;
    }
    dialog.setAttribute('data-closing', '');
  };

  // Échap déclenche « cancel » : on garde l'animation de fermeture.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target === dialog && dialog.hasAttribute('data-closing')) {
        dialog.removeAttribute('data-closing');
        dialog.close();
      }
    };
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('animationend', onAnimationEnd);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);

  // Sécurité : le menu ne reste jamais ouvert après un changement de page.
  useEffect(() => close(true), [pathname]);

  return (
    <header className="flex items-center justify-between px-4 pt-4 lg:hidden">
      <Link href="/" aria-label={t('homeLabel')} className="group/logo">
        <Logo />
      </Link>

      <button
        ref={buttonRef}
        type="button"
        onClick={open}
        aria-label={t('openMenu')}
        aria-expanded="false"
        aria-controls="mobile-menu"
        className={cx('flex size-12 flex-col items-center justify-center gap-1.25 rounded-bouton bg-blanc', pressable)}
      >
        <span aria-hidden="true" className="h-0.75 w-5 rounded-xs bg-encre" />
        <span aria-hidden="true" className="h-0.75 w-5 rounded-xs bg-encre" />
        <span aria-hidden="true" className="mr-3 h-0.75 w-3 self-end rounded-xs bg-encre" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label={t('menu')}
        className={cx(
          'mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-violet p-4 text-blanc',
          'backdrop:bg-transparent',
        )}
      >
        <div aria-hidden="true" className="absolute -right-15 bottom-30 size-45 animate-spin-slow rounded-[40px] border-2 bg-tomate" />
        <div aria-hidden="true" className="absolute -bottom-12.5 -left-12.5 size-42.5 animate-float rounded-full border-2 bg-citron" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="font-display text-[19px] font-extrabold tracking-titre">{t('brand')}</span>
            <button
              type="button"
              onClick={() => close()}
              aria-label={t('closeMenu')}
              className={cx('inline-flex size-12 items-center justify-center rounded-bouton bg-blanc text-encre', pressable)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label={t('label')} className="mt-11">
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ key, href }, index) => {
                const active = isActive(pathname, href);
                return (
                  <li key={key} className="menu-link" style={{ animationDelay: `${150 + index * 60}ms` }}>
                    <Link
                      href={href}
                      onClick={() => close(true)}
                      aria-current={active ? 'page' : undefined}
                      className="flex items-center justify-between px-1 py-1.5 font-display text-[46px] leading-none font-extrabold tracking-display"
                    >
                      <span
                        style={active ? ({ rotate: `${ACTIVE_ROTATIONS[index]}deg` } as CSSProperties) : undefined}
                        className={cx(
                          'inline-block rounded-[0.18em] border-2 px-[0.12em]',
                          active ? 'bg-citron text-encre' : 'border-transparent',
                        )}
                      >
                        {t(key)}
                      </span>
                      <span aria-hidden="true" className="font-mono text-[13px] font-semibold opacity-85">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto flex gap-2.5">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cx('flex min-h-12 flex-1 items-center justify-center rounded-bouton bg-blanc font-bold text-encre', pressable)}
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cx('flex min-h-12 flex-1 items-center justify-center rounded-bouton bg-blanc font-bold text-encre', pressable)}
            >
              GitHub
            </a>
            <LocaleSwitch
              label="other"
              className={cx(
                'flex min-h-12 min-w-16 items-center justify-center rounded-bouton bg-citron font-mono font-semibold text-encre',
                pressable,
              )}
            />
          </div>
        </div>
      </dialog>
    </header>
  );
}
