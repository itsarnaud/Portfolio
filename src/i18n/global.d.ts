import type messages from '../../messages/fr.json';
import type { routing } from './routing';

// Types next-intl : les langues et les clés de traduction sont vérifiées par TypeScript.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
