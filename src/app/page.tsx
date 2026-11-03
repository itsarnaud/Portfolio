import { redirect } from 'next/navigation';

// Le proxy next-intl redirige déjà "/" selon la langue du navigateur. Ceci est un filet de sécurité.
export default function RootPage() {
  redirect('/fr');
}
