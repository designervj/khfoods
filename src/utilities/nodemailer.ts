import nodemailer from "nodemailer";

import { getCachedGlobal } from "./getGlobals";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type EmailResponse = {
  success: boolean;
  messageId: string;
};

const createEmailTransporter = async () => {
  const { smtp } = await getCachedGlobal("emailMessages", "en", 1)();

  const { host, fromEmail, password, port, secure, user } = smtp ?? {};

  // Trim whitespace from all string values to prevent DNS errors
  const finalHost = (host ?? process.env.SMTP_HOST)?.trim();
  const finalUser = (user ?? process.env.SMTP_USER)?.trim();
  const finalPassword = (password ?? process.env.SMTP_PASS)?.trim();
  const finalFromEmail = (fromEmail ?? process.env.SMTP_USER)?.trim();

  console.log(`[SMTP] Configuring email transporter with host: ${finalHost}, user: ${finalUser}`);

  if (!finalHost || !finalUser || !finalPassword) {
    console.error('[SMTP] ❌ Missing SMTP configuration. Please configure in Admin Panel or environment variables.');
    throw new Error('SMTP configuration is incomplete. Please set up email settings in the Admin Panel.');
  }

  return {
    transporter: nodemailer.createTransport({
      host: finalHost,
      port: Number(port ?? 587),
      secure: secure ?? false,
      auth: { user: finalUser, pass: finalPassword }
    }),
    fromEmail: finalFromEmail
  };
};

export const sendEmail = async ({ to, subject, html }: EmailPayload): Promise<EmailResponse> => {
  const { transporter, fromEmail } = await createEmailTransporter();

  console.log(`[Email] Sending email to: ${to}, subject: ${subject}, from: ${fromEmail}`);

  try {
    const { messageId } = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html
    });

    console.log(`[Email] ✅ Email sent successfully. MessageId: ${messageId}`);
    return { success: true, messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error";
    console.error(`[Email] ❌ Failed to send email:`, error);
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
};
