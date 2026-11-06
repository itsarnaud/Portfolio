'use client';

import Link from 'next/link';
import { EMAIL } from '@/components/layout/navLinks';
import { stripMarks } from '@/lib/utils';
import { fontVariables } from '@/styles/fonts';
import '@/styles/globals.css';
import fr from '../../messages/fr.json';

// Remplace le layout quand il plante : d'où le <html> propre et le texte en dur en français.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = fr.error;
  const code = error.digest ?? 'client';
  const title = stripMarks(t.title);

  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <title>{fr.meta.error.title}</title>
        <meta name="robots" content="noindex" />
        <main className="site-container flex min-h-dvh flex-col justify-center gap-6 py-12">
          <span className="self-start rounded-full border-2 bg-rose px-3 py-1.5 font-mono text-sm font-semibold">{t.badge}</span>
          <h1 className="text-[48px] leading-[0.95] tracking-display md:text-[80px]">{title}</h1>
          <p className="max-w-135 leading-[1.55] text-encre-douce md:text-[19px]">{t.text}</p>
          <div className="flex flex-wrap gap-3.5">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-13 items-center rounded-bouton border-2 bg-violet px-6 font-bold text-blanc shadow-dure"
            >
              {t.retry}
            </button>
            <Link href="/fr" className="inline-flex min-h-13 items-center rounded-bouton border-2 bg-blanc px-6 font-bold shadow-dure">
              {t.home}
            </Link>
          </div>
          <p className="text-encre-douce">
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(t.mailBody.replace('{code}', code))}`}
              className="font-bold text-encre underline underline-offset-4"
            >
              {t.report}
            </a>{' '}
            {t.withCode} <code className="rounded-full border-2 bg-blanc px-2.5 py-0.5 font-mono text-sm">{code}</code>
          </p>
        </main>
      </body>
    </html>
  );
}
