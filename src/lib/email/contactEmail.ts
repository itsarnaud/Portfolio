import fr from '../../../messages/fr.json';
import type { ContactTopic } from '../contact';

/**
 * Le mail reçu à chaque message du formulaire (maquette « Email »).
 * Mise en page en tableaux et styles en ligne : c'est ce que les messageries comprennent le mieux.
 * Tout ce qui vient du visiteur est échappé avant d'être inséré.
 */

const SITE_URL = 'https://arnaudroyer.fr';
const LOGO_URL = `${SITE_URL}/images/email/logo@2x.png`;

const INK = '#121212';
const PAPER = '#F7F7F2';
const DISPLAY = "'Bricolage Grotesque', 'Arial Black', Arial, sans-serif";
const BODY = "'Karla', Arial, Helvetica, sans-serif";

/** Couleur de la chip du sujet, comme sur le formulaire. */
const TOPIC_COLORS: Record<ContactTopic, [background: string, text: string]> = {
  website: ['#FFCB3D', INK],
  webApp: ['#6B3CF0', '#FFFFFF'],
  workStudy: ['#C8F54A', INK],
  reinforcement: ['#2E5BFF', '#FFFFFF'],
  other: ['#FF9BD0', INK],
};

export type ContactEmailData = {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
  locale: 'fr' | 'en';
  page: string;
  date: Date;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** « 3 nov. · 23:35 » et « 3 novembre 2026 à 23:35 », à l'heure de Paris. */
function formatDates(date: Date) {
  const parts = (options: Intl.DateTimeFormatOptions) =>
    Object.fromEntries(
      new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', ...options })
        .formatToParts(date)
        .map(({ type, value }) => [type, value]),
    );
  const short = parts({ day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const long = parts({ day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return {
    short: `${short.day} ${short.month} · ${short.hour}:${short.minute}`,
    long: `${long.day} ${long.month} ${long.year} à ${long.hour}:${long.minute}`,
  };
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function buildContactEmail(data: ContactEmailData) {
  const name = data.name.trim();
  const firstName = name.split(/\s+/)[0] ?? name;
  const topicLabel = fr.contact.topics[data.topic];
  const [topicBg, topicFg] = TOPIC_COLORS[data.topic];
  const dates = formatDates(data.date);
  const preheader = data.message.replace(/\s+/g, ' ').trim().slice(0, 90);
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re : ${topicLabel}`)}`;

  const e = {
    name: escapeHtml(name),
    firstName: escapeHtml(firstName),
    email: escapeHtml(data.email),
    topic: escapeHtml(topicLabel),
    message: escapeHtml(data.message.trim()).replace(/\r?\n/g, '<br>'),
    page: escapeHtml(data.page),
    preheader: escapeHtml(preheader),
    initials: escapeHtml(initials(name)),
  };
  const language = data.locale === 'en' ? 'Anglais' : 'Français';

  const subject = `[Portfolio] ${topicLabel} · ${name}`;

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
<style>
  /* Petits écrans (messageries qui comprennent les media queries) : version compacte de la maquette */
  @media (max-width: 480px) {
    .card { padding: 22px 18px 26px !important; }
    .title { font-size: 34px !important; }
    .footer { padding: 18px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#E9E9E2;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${e.preheader}&#8203;</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#E9E9E2" style="background:#E9E9E2;">
<tr><td align="center" style="padding:32px 12px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${PAPER}" style="max-width:600px;background:${PAPER};border:2px solid ${INK};border-right-width:6px;border-bottom-width:6px;border-radius:22px;border-collapse:separate;font-family:${BODY};color:${INK};">
<tr><td class="card" style="padding:32px 30px 34px;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:middle;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:12px;"><img src="${LOGO_URL}" width="56" height="56" alt="ar" style="display:block;border:0;"></td>
        <td style="vertical-align:middle;font-family:${DISPLAY};font-weight:800;font-size:17px;letter-spacing:-0.02em;">arnaudroyer.fr</td>
      </tr></table>
    </td>
    <td align="right" style="vertical-align:middle;font-size:13px;color:#4A4A44;white-space:nowrap;">${dates.short}</td>
  </tr></table>

  <h1 class="title" style="margin:30px 0 0;font-family:${DISPLAY};font-weight:800;font-size:40px;line-height:1.2;letter-spacing:-0.03em;color:${INK};">${e.firstName} t'a <span style="background:#FFCB3D;border:2px solid ${INK};border-radius:8px;padding:0 6px;">écrit</span>&nbsp;:)</h1>
  <p style="margin:14px 0 0;font-size:16px;line-height:1.5;color:#3A3A35;">Nouveau message depuis le formulaire de contact, le ${dates.long}.</p>

  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;"><tr>
    <td style="font-size:14px;color:#4A4A44;padding-right:10px;">C'est pour</td>
    <td bgcolor="${topicBg}" style="background:${topicBg};color:${topicFg};border:2px solid ${INK};border-radius:999px;padding:7px 14px;font-weight:700;font-size:15px;white-space:nowrap;">${e.topic}</td>
  </tr></table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" style="margin-top:22px;background:#FFFFFF;border:2px solid ${INK};border-radius:18px;border-collapse:separate;">
  <tr><td style="padding:16px 18px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="52" style="vertical-align:middle;padding-right:14px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="44" height="44" align="center" bgcolor="#FF9BD0" style="width:44px;height:44px;background:#FF9BD0;border:2px solid ${INK};border-radius:50%;font-family:${DISPLAY};font-weight:800;font-size:17px;">${e.initials}</td></tr></table>
      </td>
      <td style="vertical-align:middle;">
        <div style="font-family:${DISPLAY};font-weight:800;font-size:20px;">${e.name}</div>
        <a href="mailto:${e.email}" style="display:inline-block;margin-top:2px;font-size:15px;color:#6B3CF0;text-decoration:underline;word-break:break-all;">${e.email}</a>
      </td>
    </tr></table>
  </td></tr>
  </table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" style="margin-top:14px;background:#FFFFFF;border:2px solid ${INK};border-radius:18px;border-collapse:separate;">
  <tr><td style="padding:20px 20px 22px;">
    <div style="font-size:14px;font-weight:700;color:#4A4A44;">Son message</div>
    <div style="margin-top:10px;font-size:17px;line-height:1.6;color:${INK};">${e.message}</div>
  </td></tr>
  </table>

  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr>
    <td bgcolor="#6B3CF0" style="background:#6B3CF0;border:2px solid ${INK};border-right-width:5px;border-bottom-width:5px;border-radius:14px;">
      <a href="${replyHref}" style="display:inline-block;padding:15px 24px;font-family:${BODY};font-weight:700;font-size:17px;color:#FFFFFF;text-decoration:none;">Répondre à ${e.firstName} &rarr;</a>
    </td>
  </tr></table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;border-top:2px dashed ${INK};"><tr>
    <td style="padding-top:16px;font-size:14px;line-height:1.7;color:#4A4A44;">
      Langue du site : <strong style="color:${INK};">${language}</strong><br>
      Envoyé depuis : <strong style="color:${INK};">${e.page}</strong>
    </td>
  </tr></table>

</td></tr>
<tr><td class="footer" bgcolor="${INK}" style="background:${INK};border-radius:0 0 14px 14px;padding:18px 30px;color:${PAPER};font-size:14px;line-height:1.6;">
  <span style="color:#C8F54A;">&#10022;</span>&nbsp; Envoyé depuis <a href="${SITE_URL}" style="color:#C8F54A;font-weight:700;text-decoration:underline;">arnaudroyer.fr</a><br>
  <span style="color:#B9B9B0;font-size:13px;">Réponds directement à ce mail, ta réponse part chez ${e.firstName}.</span>
</td></tr>
</table>

</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${firstName} t'a écrit :)`,
    `Nouveau message depuis le formulaire de contact, le ${dates.long}.`,
    '',
    `C'est pour : ${topicLabel}`,
    `De : ${name} <${data.email}>`,
    '',
    data.message.trim(),
    '',
    `Langue du site : ${language}`,
    `Envoyé depuis : ${data.page}`,
    '',
    `Réponds directement à ce mail, ta réponse part chez ${firstName}.`,
  ].join('\n');

  return { subject, html, text };
}
