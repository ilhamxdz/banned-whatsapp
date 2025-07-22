const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saidahcantik961@gmail.com',
    pass: 'BANDUNG1234'
  }
});

function kirimEmailKeWhatsApp(phone) {
  const mailOptions = {
    from: 'saidahcantik961@gmail.com',
    to: 'support@whatsapp.com',
    subject: 'Laporan Nomor WhatsApp Abuse',
    text: `Halo WhatsApp, saya ingin melaporkan nomor mencurigakan:

Nomor: ${phone}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log('✅ Email dikirim:', info.response);
  });
}

app.post('/ban', (req, res) => {
  const { phone } = req.body;
  console.log(`[BAN] Nomor: ${phone}`);
  res.json({ success: true, message: `Nomor ${phone} berhasil di-ban.` });
});

app.post('/report', (req, res) => {
  const { phone } = req.body;
  console.log(`[REPORT] Nomor: ${phone}`);
  kirimEmailKeWhatsApp(phone);
  res.json({ success: true, message: `Nomor ${phone} berhasil direport dan dikirim ke WhatsApp.` });
});

app.listen(port, () => {
  console.log(`✅ Server aktif di http://localhost:${port}`);
});