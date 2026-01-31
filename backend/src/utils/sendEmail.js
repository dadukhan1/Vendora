/** @format */

import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, subject, body) => {
  // ✅ Add parameters
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // ✅ Add email
      pass: process.env.EMAIL_PASSWORD, // ✅ Add app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // ✅ Use env variable
    to,
    subject,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};
