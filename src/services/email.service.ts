import { transporter } from '@/src/lib/mailer';

type ContactData = {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  date: string;
};

const buildContactEmailHtml = (data: ContactData) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e5e5;">

          <tr>
            <td style="padding: 40px 40px 30px; border-bottom: 1px solid #e5e5e5;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #171717;">
                Nouveau message depuis le portfolio
              </h1>
              <p style="margin: 10px 0 0; font-size: 14px; color: #737373;">
                Reçu le ${data.date}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px;">

              <table role="presentation" style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px; background-color: #fafafa; border-left: 3px solid #171717;">
                    <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">
                      Sujet
                    </p>
                    <p style="margin: 0; font-size: 16px; font-weight: 500; color: #171717;">
                      ${data.subject}
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">
                      De
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #171717;">
                      <strong>${data.from_name}</strong>
                    </p>
                    <a href="mailto:${data.from_email}" style="font-size: 14px; color: #525252; text-decoration: none;">
                      ${data.from_email}
                    </a>
                  </td>
                </tr>
              </table>

              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">
                      Message
                    </p>
                    <div style="padding: 20px; background-color: #fafafa; border: 1px solid #e5e5e5;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #171717; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 30px;">
              <a href="mailto:${data.from_email}" style="display: inline-block; padding: 14px 28px; background-color: #171717; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500;">
                Répondre à ${data.from_name}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 25px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #737373; text-align: center;">
                Message envoyé depuis <strong>arnaudroyer.fr</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const sendContactEmail = async (data: ContactData) => {
  await transporter.sendMail({
    from: `"${data.from_name} via arnaudroyer.fr" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: data.from_email,
    subject: `[Portfolio] ${data.subject}`,
    html: buildContactEmailHtml(data),
  });
};
