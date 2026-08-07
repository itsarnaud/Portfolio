import "./globals.css";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <p className="text-sm tracking-widest text-muted-foreground mb-6">ERREUR 404</p>
          <h1 className="text-4xl md:text-6xl font-display mb-6">Page non trouvée</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
