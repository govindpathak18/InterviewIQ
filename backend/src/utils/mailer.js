const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.secure,
  auth: {
    user: env.mail.user,
    pass: env.mail.pass,
  },
});

const sendMail = async ({ to, subject, html, text = "" }) => {
  await transporter.sendMail({
    from: env.mail.from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = {
  sendMail,
};
