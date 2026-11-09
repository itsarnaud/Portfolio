export const navLinks = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'experiences', href: '/experiences' },
  { key: 'contact', href: '/contact' },
] as const;

export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const LINKEDIN_URL = 'https://www.linkedin.com/in/royer-arnaud/';
export const GITHUB_URL = 'https://github.com/itsarnaud';
export const INSTAGRAM_URL = 'https://www.instagram.com/itsarnaud.dev/';
export const TIKTOK_URL = 'https://www.tiktok.com/@itsarnaud.dev';
export const EMAIL = 'contact@arnaudroyer.fr';
