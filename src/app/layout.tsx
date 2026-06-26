import type { ReactNode } from 'react';

// Root layout — html/body are rendered by [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
