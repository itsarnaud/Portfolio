/**
 * Ce qui est partagé entre le formulaire de contact (navigateur) et l'API (serveur) :
 * les sujets proposés et les règles de validation.
 */

/** Les sujets du formulaire, dans l'ordre. Les libellés sont dans messages (contact.topics). */
export const contactTopics = ['website', 'webApp', 'workStudy', 'reinforcement', 'other'] as const;

export type ContactTopic = (typeof contactTopics)[number];

export const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

/** Format d'email simple (le même qu'en v2) : quelque chose@quelque chose.extension */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  from_name: string;
  from_email: string;
  /** Libellé du sujet choisi, tel qu'affiché au visiteur (« Un site vitrine »). */
  subject: string;
  topic: ContactTopic;
  message: string;
  locale: 'fr' | 'en';
  /** Page d'où le message est parti (/fr/contact). */
  page: string;
  /** Champ piège invisible : un humain le laisse vide, un robot le remplit. */
  website?: string;
};

export type ContactField = 'name' | 'email' | 'topic' | 'message';

/** Les champs invalides du formulaire (vide si tout est bon). */
export function validateContact(data: {
  name: string;
  email: string;
  topic: string | null;
  message: string;
}): ContactField[] {
  const errors: ContactField[] = [];
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  if (!name || name.length > LIMITS.name) errors.push('name');
  if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email) errors.push('email');
  if (!data.topic || !(contactTopics as readonly string[]).includes(data.topic)) errors.push('topic');
  if (!message || message.length > LIMITS.message) errors.push('message');
  return errors;
}
