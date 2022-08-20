const TelegramApi = require('node-telegram-bot-api');

const token = '5615401316:AAHqRBBfsvGje0EsDlLIPi3Bra9hTKFtwfU';

const bot = new TelegramApi(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello, I was created to help you find books all over the Internet. I will select the best offers for you at the moment.');
});

bot.on('message', (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `you wrote me : ${text}`);
});
