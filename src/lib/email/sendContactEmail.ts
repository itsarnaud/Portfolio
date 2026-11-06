import { transporter } from '../mailer';
import { buildContactEmail, type ContactEmailData } from './contactEmail';

// Noms passés en objets : nodemailer les encode, ils ne peuvent pas casser les en-têtes.
export async function sendContactEmail(data: ContactEmailData) {
  const { subject, html, text } = buildContactEmail(data);
  const siteAddress = process.env.SMTP_USER ?? '';

  await transporter.sendMail({
    from: { name: `${data.name.trim()} via arnaudroyer.fr`, address: siteAddress },
    to: siteAddress,
    replyTo: { name: data.name.trim(), address: data.email.trim() },
    subject,
    html,
    text,
  });
}
