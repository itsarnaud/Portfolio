'use client';

import { useEffect } from 'react';

/**
 * Change le titre de l'onglet depuis le navigateur. Sert à la 404 des projets et articles
 * inconnus : Next 16 la construit dans le navigateur, sans passer par generateMetadata.
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
