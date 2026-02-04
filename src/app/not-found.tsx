import { Metadata } from 'next';
import Link from 'next/link';
import { MagneticButton } from '../components/ui/MagneticButton';

export const metadata: Metadata = {
  title: 'Page non trouvée',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
      <p className="text-sm tracking-widest text-muted-foreground mb-4 font-mono">ERREUR 404</p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 text-center">
        Page non trouvée
      </h1>
      <p className="text-lg text-muted-foreground max-w-md text-center mb-12">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <MagneticButton>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3M3 8L8 3M3 8L8 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </MagneticButton>
    </div>
  );
}
