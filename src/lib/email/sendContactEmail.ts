import { transporter } from '../mailer';
import { buildContactEmail, type ContactEmailData } from './contactEmail';

/**
 * Envoie le message du formulaire à l'adresse du site (SMTP_USER).
 * « Répondre » dans la messagerie répond directement au visiteur (replyTo).
 * Les noms sont passés en objets {name, address} : nodemailer les encode, un nom avec des
 * guillemets ou des retours à la ligne ne peut donc pas casser les en-têtes du mail.
 */
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
