import nodemailer from "nodemailer";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});

const sendEmail = async (options) => {
  const email = { ...options, from: UKR_NET_EMAIL };
  return transporter.sendMail(email);
};

export default sendEmail;
