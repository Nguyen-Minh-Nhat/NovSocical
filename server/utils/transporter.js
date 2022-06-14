const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_NAME,
		pass: process.env.GMAIL_PASSWORD,
	},
});

module.exports = transporter;
