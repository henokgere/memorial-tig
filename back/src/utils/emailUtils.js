const nodemailer = require('nodemailer');

exports.sendEmailVerification = async (user) => {
  // Example email sending logic
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: '"Memorial App" <no-reply@memorial.com>',
    to: user.email,
    subject: 'Email Verification',
    text: `Hello ${user.name}, please verify your email.`,
    html: `<p>Hello <strong>${user.name}</strong>, please verify your email.</p>`
  };

  await transporter.sendMail(mailOptions);
};
