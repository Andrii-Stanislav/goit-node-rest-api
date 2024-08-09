import nodemailer from "nodemailer";
import "dotenv/config";

const { API_URL, EMAIL_FROM, EMAIL_PASSWORD } = process.env;

const emailTransport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = (data) =>
  emailTransport.sendMail({ ...data, from: EMAIL_FROM });

export const getVerifyEmailData = ({ email, verificationToken }) => ({
  to: email,
  subject: "Verify email",
  html: `<a target="_blank" href="${API_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
});
