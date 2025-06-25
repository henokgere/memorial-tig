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
