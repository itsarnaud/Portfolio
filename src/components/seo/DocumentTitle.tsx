'use client';

import { useEffect } from 'react';

// Next 16 construit cette 404 dans le navigateur, sans passer par generateMetadata.
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
