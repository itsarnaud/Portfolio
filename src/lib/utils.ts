export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function formatDate(locale: string, isoDate: string): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T12:00:00`),
  );
}

// Appel simple sans options, plus les deux propriétés directes pour les anciens Safari.
export function scrollToTop(): void {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function stripMarks(text: string): string {
  return text.replace(/<\/?mark>/g, '');
}
