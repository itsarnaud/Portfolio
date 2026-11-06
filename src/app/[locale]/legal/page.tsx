import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { EMAIL } from '@/components/layout/navLinks';
import { TextPop } from '@/components/motion/TextPop';
import { host, publisher } from '@/content/legal';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';

const link = 'font-bold underline underline-offset-4 hover:text-violet';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[28px] tracking-titre-carte md:text-[34px]">{title}</h2>
      {children}
    </section>
  );
}

function Details({ rows }: { rows: [label: string, value: ReactNode][] }) {
  return (
    <dl className="flex flex-col rounded-carte border-2 bg-blanc px-5 shadow-dure md:px-6">
      {rows.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1 border-b-2 border-dashed py-3.5 last:border-b-0 sm:flex-row sm:gap-4">
          <dt className="font-bold sm:w-52 sm:shrink-0">{label}</dt>
          <dd className="[overflow-wrap:anywhere] text-encre-douce">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function generateMetadata({ params }: PageProps<'/[locale]/legal'>): Promise<Metadata> {
  return staticPageMetadata(params, 'legal');
}

export default async function LegalPage({ params }: PageProps<'/[locale]/legal'>) {
  await resolveLocale(params);
  const t = await getTranslations('legal');
  const mail = (
    <a href={`mailto:${EMAIL}`} className={link}>
      {EMAIL}
    </a>
  );

  return (
    <div className="site-container pt-10 md:pt-20">
      <div className="mx-auto flex max-w-lecture flex-col gap-10 md:gap-12">
        <header className="flex flex-col gap-4 md:gap-5">
          <TextPop
            text={t.raw('title')}
            className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,84px)]"
            renderers={{
              mark: (word) => <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-citron px-[0.12em]">{word}</span>,
            }}
          />
          <p className="animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '400ms' }}>
            {t('intro')}
          </p>
        </header>

        <Section title={t('publisher.title')}>
          <Details
            rows={[
              [t('publisher.name'), publisher.name],
              [t('publisher.status'), t('publisher.statusValue')],
              [t('publisher.siret'), publisher.siret],
              [t('publisher.address'), publisher.address],
              [t('publisher.phone'), publisher.phone],
              [t('publisher.email'), mail],
              [t('publisher.director'), publisher.name],
            ]}
          />
        </Section>

        <Section title={t('host.title')}>
          <Details
            rows={[
              [t('host.name'), host.name],
              [t('host.address'), host.address],
              [
                t('host.contact'),
                <a key="host" href={host.contact} target="_blank" rel="noopener noreferrer" className={link}>
                  {host.contact.replace('https://', '')}
                </a>,
              ],
            ]}
          />
        </Section>

        <Section title={t('data.title')}>
          <div className="flex flex-col gap-4 leading-[1.6] text-encre-douce md:text-lg">
            <p>{t('data.collected')}</p>
            <p>{t('data.kept')}</p>
            <p>{t.rich('data.rights', { mail: () => mail })}</p>
          </div>
        </Section>

        <Section title={t('stats.title')}>
          <p className="leading-[1.6] text-encre-douce md:text-lg">{t('stats.text')}</p>
        </Section>
      </div>
    </div>
  );
}
