'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Confetti } from '@/components/motion/Confetti';
import { bgClass, hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { contactTopics, LIMITS, validateContact, type ContactField, type ContactTopic } from '@/lib/contact';
import { cx } from '@/lib/utils';

const TOPIC_COLORS: Record<ContactTopic, ColorName> = {
  website: 'soleil',
  webApp: 'violet',
  workStudy: 'citron',
  reinforcement: 'cobalt',
  other: 'rose',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-bouton border-2 bg-papier px-4 text-[17px] transition-[box-shadow,translate,background-color] duration-150 ease-out placeholder:text-encre-pale/70 focus:-translate-0.5 focus:bg-blanc focus:shadow-[5px_5px_0_var(--color-violet)] focus:outline-none aria-invalid:border-tomate-fonce';

export function ContactForm() {
  const t = useTranslations('contact');
  const tCursor = useTranslations('cursor');
  const tFooter = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();

  const [topic, setTopic] = useState<ContactTopic | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [errors, setErrors] = useState<ContactField[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);

  // La confirmation prend le focus, pour que les lecteurs d'écran l'annoncent.
  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const hint =
    messageLength === 0 ? t('hints.empty') : messageLength < 40 ? t('hints.short') : messageLength < 200 ? t('hints.good') : t('hints.long');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
      topic,
    };

    const invalid = validateContact(values);
    setErrors(invalid);
    if (invalid.length > 0) {
      const first = invalid[0] === 'topic' ? formRef.current?.querySelector<HTMLElement>('[data-topic]') : formRef.current?.elements.namedItem(invalid[0]);
      (first as HTMLElement | null)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const [response] = await Promise.all([
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from_name: values.name.trim(),
            from_email: values.email.trim(),
            subject: t(`topics.${topic!}`),
            topic,
            message: values.message.trim(),
            locale,
            page: pathname,
            website: String(form.get('website') ?? ''),
          }),
        }),
        // Laisse à l'avion le temps de s'envoler.
        new Promise((resolve) => setTimeout(resolve, 650)),
      ]);
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setTopic(null);
    setMessageLength(0);
    setErrors([]);
  };

  const errorText = (name: ContactField) =>
    errors.includes(name) ? (
      <p id={`contact-${name}-error`} className="text-sm font-bold text-tomate-fonce">
        {t(`errors.${name}`)}
      </p>
    ) : null;

  if (status === 'sent') {
    return (
      <div className="relative flex animate-zoom-in flex-col items-start gap-4 rounded-[26px] border-2 bg-citron p-7 shadow-dure-md md:p-10">
        <span className="relative inline-flex size-16 items-center justify-center rounded-full border-2 bg-blanc">
          <Confetti />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 ref={sentRef} tabIndex={-1} className="text-[36px] tracking-titre outline-none md:text-[44px]">
          {t('sentTitle')}
        </h2>
        <p className="text-lg leading-normal">{t('sentText')}</p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center rounded-bouton border-2 bg-blanc px-5 font-bold shadow-dure transition-[translate,box-shadow] duration-150 hover:-translate-0.5 hover:shadow-dure-md active:translate-0.5 active:shadow-none"
        >
          {t('again')}
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5.5 rounded-[26px] border-2 bg-blanc p-[clamp(20px,4vw,36px)] shadow-dure-md"
    >
      <div className="flex flex-wrap gap-4.5">
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="contact-name" className="text-[15px] font-bold">
            {t('name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder={t('namePlaceholder')}
            aria-invalid={errors.includes('name') || undefined}
            aria-describedby={errors.includes('name') ? 'contact-name-error' : undefined}
            className={cx(field, 'min-h-13')}
          />
          {errorText('name')}
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-2">
          <label htmlFor="contact-email" className="text-[15px] font-bold">
            {t('email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            placeholder={t('emailPlaceholder')}
            aria-invalid={errors.includes('email') || undefined}
            aria-describedby={errors.includes('email') ? 'contact-email-error' : undefined}
            className={cx(field, 'min-h-13')}
          />
          {errorText('email')}
        </div>
      </div>

      <fieldset aria-describedby={errors.includes('topic') ? 'contact-topic-error' : undefined}>
        <legend className="mb-2.5 text-[15px] font-bold">{t('topic')}</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((id, index) => {
            const active = topic === id;
            return (
              <button
                key={id}
                type="button"
                data-topic={index === 0 ? '' : undefined}
                onClick={() => setTopic(id)}
                aria-pressed={active}
                data-cursor={tCursor('choose')}
                data-cursor-color={hex[TOPIC_COLORS[id]]}
                className={cx(
                  'min-h-11 rounded-full border-2 px-4 text-[15px] font-bold transition-[background-color,color,box-shadow] duration-200',
                  active ? cx(bgClass[TOPIC_COLORS[id]], 'animate-boing shadow-dure-sm') : 'bg-blanc hover:animate-jig',
                )}
              >
                {t(`topics.${id}`)}
              </button>
            );
          })}
        </div>
        <div className="mt-2">{errorText('topic')}</div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-[15px] font-bold">
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          placeholder={t('messagePlaceholder')}
          onInput={(event) => setMessageLength(event.currentTarget.value.trim().length)}
          aria-invalid={errors.includes('message') || undefined}
          aria-describedby={cx('contact-message-hint', errors.includes('message') && 'contact-message-error')}
          className={cx(field, 'resize-y py-3.5 leading-normal')}
        />
        <div className="flex flex-wrap items-start justify-between gap-2">
          {errorText('message') ?? <span />}
          <span id="contact-message-hint" aria-live="polite" className="text-sm text-encre-pale">
            {hint}
          </span>
        </div>
      </div>

      {/* Champ piège : invisible pour les humains, les robots le remplissent. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-website">{t('honeypot')}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-bouton border-2 border-tomate-fonce bg-tomate/15 px-4 py-3 font-bold">
          {t('errors.server')}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <span className="text-sm text-encre-pale">
          {t.rich('privacy', {
            link: (chunks) => (
              <Link href="/legal" data-transition-label={tFooter('legal')} className="underline underline-offset-2 hover:text-violet">
                {chunks}
              </Link>
            ),
          })}
        </span>
        <button
          type="submit"
          disabled={sending}
          data-cursor={tCursor('send')}
          data-cursor-color={hex.citron}
          className="group/send inline-flex min-h-13.5 items-center gap-2.5 overflow-hidden rounded-bouton border-2 bg-violet px-6.5 text-[17px] font-bold text-blanc shadow-dure transition-[translate,box-shadow] duration-150 ease-out hover:-translate-0.5 hover:shadow-dure-md active:translate-0.5 active:shadow-none disabled:pointer-events-none"
        >
          {sending ? t('sending') : t('send')}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={cx(
              'size-5 transition-[translate,rotate,opacity] duration-600 ease-[cubic-bezier(0.6,-0.3,0.7,1)] group-hover/send:-rotate-12',
              sending && 'translate-x-[260px] -translate-y-[160px] rotate-20 opacity-0',
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
