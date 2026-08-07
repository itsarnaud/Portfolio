'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const LanguageSwitcher = ({ className = "text-foreground" }: { className?: string }) => {
  const locale   = useLocale();
  const pathname = usePathname(); // full path: e.g. /fr/about or /en/about
  const router   = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: 'fr' | 'en') => {
    if (next === locale) return;
    // Replace the current locale prefix with the new one
    const newPath = `/${next}` + pathname.slice(`/${locale}`.length);
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className={`flex items-center gap-1 text-xs tracking-widest transition-opacity ${className} ${isPending ? 'opacity-50' : ''}`}>
      <button
        onClick={() => switchLocale('fr')}
        className={`px-1 transition-opacity ${locale === 'fr' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
        aria-label="Passer en français"
      >
        FR
      </button>
      <span className="opacity-30">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-1 transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
