import { Fragment, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

/** Un mot, ou un groupe balisé (<mark>mes projets</mark>) avec sa ponctuation collée. */
const TOKEN = /\S*<(\w+)>.*?<\/\1>\S*|\S+/g;
const TAGGED = /^(.*?)<(\w+)>(.*?)<\/\2>(.*)$/;

type TextPopProps = {
  /** Le texte brut du message (t.raw), avec ses balises : « Je fabrique des <swing>sites</swing>, … ». */
  text: string;
  /** Comment afficher chaque balise. Une balise inconnue affiche juste son texte. */
  renderers?: Record<string, (content: string) => ReactNode>;
  as?: 'h1' | 'h2' | 'p';
  /** Délai avant le premier mot, en ms. */
  delay?: number;
  className?: string;
};

/**
 * Titre qui apparaît mot par mot : chaque mot monte de 0,55em en se redressant (7° vers 0°).
 * 70 ms entre deux mots, 90 ms avant un mot mis en avant. Uniquement du CSS : les mots
 * sont visibles même avant le chargement du JavaScript une fois l'animation passée.
 */
export function TextPop({ text, renderers = {}, as: Tag = 'h1', delay = 150, className }: TextPopProps) {
  const tokens = (text.match(TOKEN) ?? []).map((token) => ({ token, match: token.match(TAGGED) }));
  // Délai de chaque mot : +70 ms à chaque mot, +20 ms de plus avant un mot balisé.
  const delays = tokens.reduce<number[]>((acc, { match }, index) => {
    const previous = index === 0 ? delay - 70 : acc[index - 1];
    return [...acc, previous + 70 + (match ? 20 : 0)];
  }, []);

  return (
    <Tag className={className}>
      {tokens.map(({ token, match }, index) => {
        const content = match ? (
          <>
            {match[1]}
            {renderers[match[2]]?.(match[3]) ?? match[3]}
            {match[4]}
          </>
        ) : (
          token
        );

        return (
          <Fragment key={index}>
            <span className={cx('inline-block animate-pop')} style={{ animationDelay: `${delays[index]}ms` }}>
              {content}
            </span>
            {index < tokens.length - 1 && ' '}
          </Fragment>
        );
      })}
    </Tag>
  );
}
