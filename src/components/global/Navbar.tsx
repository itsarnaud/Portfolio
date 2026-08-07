'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations }             from 'next-intl';
import { Link, usePathname }           from '@/src/i18n/navigation';
import LanguageSwitcher                from './LanguageSwitcher';
import gsap from 'gsap';

const Navbar = () => {
  const t       = useTranslations('nav');
  const pathname = usePathname();

  const navLinks = [
    { href: "/",            label: t('home') },
    { href: "/projects",    label: t('projects') },
    { href: "/blog",        label: t('blog') },
    { href: "/about",       label: t('about') },
    { href: "/experiences", label: t('experiences') },
    { href: "/contact",     label: t('contact') },
  ];

  const navRef       = useRef<HTMLElement>(null);
  const menuRef      = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 });
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(menuRef.current, { clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }, { clipPath: "circle(150% at calc(100% - 2rem) 2rem)", duration: 0.8, ease: "power4.inOut" });
      gsap.fromTo(menuItemsRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 });
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => setIsMenuOpen(false),
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-300 ${isScrolled ? 'bg-background/85 backdrop-blur-md border-b border-border' : 'border-b border-transparent'}`}
      >
        <Link href="/" className="text-lg font-medium font-display tracking-wide text-foreground hover:opacity-70 transition-opacity">
          Arnaud Royer
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide text-foreground hover:text-brand transition-colors relative ${pathname === link.href ? 'text-brand after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-brand' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher className="text-foreground" />
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={t('openMenu')}
        >
          <span className="w-6 h-px bg-foreground" />
          <span className="w-6 h-px bg-foreground" />
        </button>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-60 bg-foreground flex flex-col items-center justify-center"
          style={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
        >
          <button onClick={closeMenu} className="absolute top-6 right-6 p-2 text-background" aria-label={t('closeMenu')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                ref={(el) => { if (el) menuItemsRef.current[i] = el; }}
                href={link.href}
                onClick={closeMenu}
                className={`text-4xl font-display text-background hover:opacity-70 transition-opacity ${pathname === link.href ? 'opacity-50' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              <LanguageSwitcher className="text-background" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
