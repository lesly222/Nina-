const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Scan the QR code above with your phone.');
});

client.on('authenticated', () => {
  console.log('Successfully authenticated!');
});

client.on('ready', () => {
  console.log('NINA is online and ready!');
});

client.on('message', message => {
  console.log(`Received: ${message.body}`);

  if (message.body.toLowerCase() === 'hello') {
    message.reply('Hello! I am NINA, your WhatsApp bot.');
  }
});

client.initialize();
