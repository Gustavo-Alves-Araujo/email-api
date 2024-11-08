require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  const data = {
    from: `Your Website <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to: 'alvesgustavo0809@gmail.com', // Alterar para o email de destino
    subject: subject,
    text: message,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Email sent successfully', body });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
