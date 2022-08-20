const TelegramApi = require('node-telegram-bot-api');

const token = '5615401316:AAHqRBBfsvGje0EsDlLIPi3Bra9hTKFtwfU';

const bot = new TelegramApi(token, { polling: true })

bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    // console.log(msg);
    bot.sendMessage(chatId, `you wrote me : ${text}`);
})