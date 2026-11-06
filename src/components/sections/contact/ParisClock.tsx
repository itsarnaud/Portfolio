'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

// Vide côté serveur : l'heure du build n'aurait pas de sens.
export function ParisClock() {
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, [locale]);

  return <strong className="inline-block min-w-[5ch] tabular-nums">{time ?? '--:--'}</strong>;
}
