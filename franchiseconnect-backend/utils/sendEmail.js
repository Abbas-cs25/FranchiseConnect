import transporter from "../config/nodemailer.js";

export const sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });
  return info;
};
