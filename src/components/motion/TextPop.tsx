import { Fragment, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

const TOKEN = /\S*<(\w+)>.*?<\/\1>\S*|\S+/g;
const TAGGED = /^(.*?)<(\w+)>(.*?)<\/\2>(.*)$/;

type TextPopProps = {
  text: string;
  renderers?: Record<string, (content: string) => ReactNode>;
  as?: 'h1' | 'h2' | 'p';
  delay?: number;
  className?: string;
};

export function TextPop({ text, renderers = {}, as: Tag = 'h1', delay = 150, className }: TextPopProps) {
  const tokens = (text.match(TOKEN) ?? []).map((token) => ({ token, match: token.match(TAGGED) }));
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
