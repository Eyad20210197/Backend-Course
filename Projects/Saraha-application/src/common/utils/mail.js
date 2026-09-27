import nodemailer from 'nodemailer';

import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.port === 465,
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('Mail server connection failed:', error);
  } else {
    console.log('Mail server is ready.');
  }
});

const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: config.mail.from,
    to,
    subject,
    html,
  });
};

export default sendEmail;