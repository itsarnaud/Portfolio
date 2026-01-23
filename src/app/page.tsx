import { MagneticButton } from '../components/ui/MagneticButton';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <MagneticButton>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          Voir mes projets
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </MagneticButton>
      <div className="bg-red-500 h-screen w-40"></div>
      <div className="bg-blue-500 h-screen w-40"></div>
      <div className="bg-gray-500 h-screen w-40"></div>
    </>
  );
}
