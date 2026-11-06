import { NextResponse } from 'next/server';
import { contactTopics, validateContact, type ContactPayload, type ContactTopic } from '@/lib/contact';
import { sendContactEmail } from '@/lib/email/sendContactEmail';

export async function POST(request: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  // Champ piège rempli : on répond comme si tout allait bien, pour ne rien dire au robot.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = typeof data.from_name === 'string' ? data.from_name : '';
  const email = typeof data.from_email === 'string' ? data.from_email : '';
  const message = typeof data.message === 'string' ? data.message : '';
  // Les anciens appels (v2) n'envoient que le libellé : on retombe alors sur « Autre chose ».
  const topic: ContactTopic | null =
    typeof data.topic === 'string' && (contactTopics as readonly string[]).includes(data.topic)
      ? (data.topic as ContactTopic)
      : typeof data.subject === 'string' && data.subject.trim()
        ? 'other'
        : null;

  if (validateContact({ name, email, topic, message }).length > 0 || !topic) {
    return NextResponse.json({ error: 'Champs obligatoires ou invalides' }, { status: 400 });
  }

  const locale = data.locale === 'en' ? 'en' : 'fr';
  const page = typeof data.page === 'string' && data.page.startsWith('/') ? data.page.slice(0, 200) : `/${locale}/contact`;

  try {
    await sendContactEmail({ name, email, topic, message, locale, page, date: new Date() });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur API Contact :', error);
    return NextResponse.json({ error: "Une erreur est survenue lors de l'envoi" }, { status: 500 });
  }
}
