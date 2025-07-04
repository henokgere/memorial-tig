const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newContact = await Contact.create({ name, email, subject, message });
    return res.status(201).json({
      success: true,
      message: 'Your message has been received. Thank you!',
      data: newContact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// GET all contact messages
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};
