import Link from 'next/link';
import { fontVariables } from '@/styles/fonts';
import '@/styles/globals.css';

// 404 hors de /fr et /en (pas de langue connue). La version dans la D.A. arrive plus tard.
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <main>
          <h1>Page introuvable</h1>
          <Link href="/fr">Retour à l&apos;accueil</Link>
        </main>
      </body>
    </html>
  );
}
