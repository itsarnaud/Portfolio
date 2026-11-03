import type { ReactNode } from 'react';

// Le <html> et le <body> sont dans [locale]/layout.tsx, pour avoir le bon attribut lang.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
