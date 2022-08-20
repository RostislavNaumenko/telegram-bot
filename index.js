const TelegramApi = require('node-telegram-bot-api');
const books = require('./books.json');

const token = '5615401316:AAHqRBBfsvGje0EsDlLIPi3Bra9hTKFtwfU';

const bot = new TelegramApi(token, { polling: true });

// Functions
// Keyboard remover
const keyRemove = {
  reply_markup: {
    remove_keyboard: true,
  },
};

let typeOfFind = '';

bot.setMyCommands([
  { command: '/start', description: 'Bot restart' },
]);

// Bot listen type of find

bot.on('message', async (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id;
  if (text === '/start') {
    await bot.sendMessage(chatId, `Hello ${msg.from.first_name}, I was created to help you find books all over the Internet.`
          + ' I will select the best offers for you at the moment. Just choose by what criterion I should search for a book', {
      reply_markup: {
        keyboard: [['Name of Book', 'Author']],
      },
    });
  }
  if (text === 'Name of Book') {
    await bot.sendMessage(chatId, 'Write the name of the book and '
          + 'I will select all possible options for you', keyRemove);
    typeOfFind = 'book';
  }
  if (text === 'Author') {
    await bot.sendMessage(chatId, 'Write the name of the author and '
          + 'I will select all possible options for you', keyRemove);
    typeOfFind = 'author';
  }

  if (text !== 'Author' && text !== 'Name of Book' && text !== '/start') {
    if (typeOfFind === 'author') {
      let author = text;
      let array = null;
      books.map( async (book) => {
        if (book.author.toLowerCase().includes(author.toLowerCase())) {
          array += book;
          await bot.sendPhoto(chatId, book.img, {
            reply_markup: {
              keyboard: [['Name of Book', 'Author']],
            },
            caption: `Name: ${book.title}\nAuthor: ${book.author}\nPrice: ${book.price}\nLink: ${book.link}`,
          });
        }
      })
      if (array === null) {
        await bot.sendMessage(chatId, 'Nothing is find', {
          reply_markup: {
            keyboard: [['Name of Book', 'Author']],
          },
        })
      }
    } else if (typeOfFind === 'book') {
      let name = text;
      let array = null;
      books.map(async (book) => {
        if (book.title.toLowerCase().includes(name.toLowerCase())) {
          array += book;
          await bot.sendPhoto(chatId, book.img, {
            reply_markup: {
              keyboard: [['Name of Book', 'Author']],
            },
            caption: `Name: ${book.title}\nAuthor: ${book.author}\nPrice: ${book.price}\nLink: ${book.link}`,
          });
        }
      })
      if (array === null) {
        await bot.sendMessage(chatId, 'Nothing is find', {
          reply_markup: {
            keyboard: [['Name of Book', 'Author']],
          },
        })
      }
    }
  }
});

console.log()
