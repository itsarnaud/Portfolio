import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/src/services/email.service';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !data.from_name || !data.from_email || !data.subject || !data.message ||
      !emailRegex.test(data.from_email)
    ) {
      return NextResponse.json({ error: 'Champs obligatoires ou invalides' }, { status: 400 });
    }

    await sendContactEmail({
      from_name: data.from_name,
      from_email: data.from_email,
      subject: data.subject,
      message: data.message,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error('Erreur API Contact:', e);
    return NextResponse.json({ error: "Une erreur est survenue lors de l'envoi" }, { status: 500 });
  }
};
