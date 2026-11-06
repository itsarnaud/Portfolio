'use client';

import { ErrorView } from '@/components/sections/errors/ErrorView';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // Le code (digest) permet de retrouver l'erreur dans les logs de Vercel.
  const code = error.digest ?? 'client';
  return <ErrorView code={code} onRetry={reset} />;
}
