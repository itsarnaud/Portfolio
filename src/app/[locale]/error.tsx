'use client';

import { ErrorView } from '@/components/sections/errors/ErrorView';

/**
 * Erreur pendant l'affichage d'une page : la page d'erreur dans la D.A., avec la nav et le pied
 * de page du site. « Réessayer » relance l'affichage (reset de Next).
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // Le code (digest) permet de retrouver l'erreur dans les logs de Vercel.
  const code = error.digest ?? 'client';
  return <ErrorView code={code} onRetry={reset} />;
}
