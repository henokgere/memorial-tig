const nodemailer = require('nodemailer');

exports.sendEmailVerification = async (user) => {
  // Customize this based on your project
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Memorial App" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Verify your email',
    html: `<p>Hello ${user.name}, please verify your email by clicking the link.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendPasswordResetEmail = async ({ user, rawToken }) => {
  const resetLink = `http://localhost:5173/reset-password/${rawToken}?id=${user._id}`;

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
    subject: 'Password Reset Request',
    html: `
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>You requested a password reset. Click the link below to set a new password. This link is valid for 15 minutes.</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>If you did not request this, you can ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
