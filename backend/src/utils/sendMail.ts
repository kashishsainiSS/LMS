import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

export const SendMail = async (options: EmailOptions): Promise<void> => {
  const { email, subject, template, data } = options;

  // Define the transporter with correct types
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  } as SMTPTransport.Options);

  // Verify the transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('Error setting up the transporter', error);
    } else {
      console.log('Transporter is set up successfully', success);
    }
  });

  // Get the path to the email template file
  const templatePath = path.join(__dirname, "../mails", `${template}.ejs`);

  // Render the email template with EJS
  const html: string = await ejs.renderFile(templatePath, data);

  // Define the email options
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
