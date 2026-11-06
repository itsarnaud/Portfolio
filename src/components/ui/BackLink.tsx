import { useTranslations } from 'next-intl';
import { Arrow } from '@/components/ui/Arrow';
import { hex } from '@/content/colors';
import { Link } from '@/i18n/navigation';

export function BackLink({ href, label }: { href: string; label: string }) {
  const tCursor = useTranslations('cursor');

  return (
    <div className="site-container pt-5 md:pt-10">
      <Link
        href={href}
        data-cursor={tCursor('back')}
        data-cursor-color={hex.blanc}
        className="inline-flex min-h-11 animate-rise items-center gap-2 font-mono text-sm font-semibold hover:text-violet"
      >
        <Arrow direction="left" className="size-4" />
        {label}
      </Link>
    </div>
  );
}
