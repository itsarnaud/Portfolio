/** Assemble des classes CSS en ignorant les valeurs vides : cx('a', cond && 'b'). */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Vrai pour un lien qui sort du site (http, mailto, tel). */
export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/** Date au format long, dans la langue de la page : « 26 août 2026 », « August 26, 2026 ». */
export function formatDate(locale: string, isoDate: string): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T12:00:00`),
  );
}
