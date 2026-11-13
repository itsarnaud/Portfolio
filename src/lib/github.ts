import { GITHUB_URL } from '@/components/layout/navLinks';

export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4; week: number; weekday: number };

export type ContributionCalendar = { total: number; weeks: number; days: ContributionDay[] };

const USER = GITHUB_URL.split('/').pop();

// Page publique de GitHub (12 derniers mois glissants) : pas de clé d'API à gérer.
export async function getContributions(): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(`https://github.com/users/${USER}/contributions`, {
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'arnaudroyer.fr' },
    });
    if (!response.ok) return null;
    const html = await response.text();

    const counts = new Map<string, number>();
    for (const [, id, label] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)</g)) {
      counts.set(id, Number(label.match(/^(\d[\d,]*) contributions?/)?.[1].replace(/,/g, '') ?? 0));
    }

    const days: ContributionDay[] = [];
    let total = 0;
    for (const [cell] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
      const date = cell.match(/data-date="([^"]+)"/)?.[1];
      const id = cell.match(/\bid="contribution-day-component-(\d+)-(\d+)"/);
      const level = Number(cell.match(/data-level="(\d)"/)?.[1] ?? 0);
      if (!date || !id) continue;
      total += counts.get(`contribution-day-component-${id[1]}-${id[2]}`) ?? 0;
      days.push({ date, level: Math.min(4, level) as ContributionDay['level'], week: Number(id[2]), weekday: Number(id[1]) });
    }
    if (days.length === 0) return null;

    return { total, weeks: Math.max(...days.map((day) => day.week)) + 1, days };
  } catch {
    return null;
  }
}
