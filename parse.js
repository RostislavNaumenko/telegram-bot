const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const getHTML = async (url) => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};

const jsonFile = [];
const parse = async () => {
  const PagesOfSite = await getHTML('https://www.yakaboo.ua/ua/knigi/hudozhestvennaja-literatura/ukrainskaja-literatura.html?p=1');
  // eslint-disable-next-line no-unused-vars
  const pageNumber = PagesOfSite('a.last').text();
  // console.log(pageNumber);
  for (let i = 1; i <= pageNumber; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const selector = await getHTML(
      `https://www.yakaboo.ua/ua/knigi/hudozhestvennaja-literatura/ukrainskaja-literatura.html?p=${i}`,
    );
      // eslint-disable-next-line no-loop-func
    selector('.item__layout').each((j, element) => {
      // eslint-disable-next-line no-undef
      const GetTitle = selector(element).find('a').attr('title');
      const GetAuthor = selector(element).find('div.product-author').text();
      const NewAuthor = GetAuthor.trim();
      const GetPrice = selector(element).find('span.price').text();
      const GetLink = selector(element).find('a').attr('href');
      const GetImg = selector(element).find('img').attr('src');
      const book = {
        title: `${GetTitle}`,
        author: `${NewAuthor}`,
        img: `${GetImg}`,
        price: `${GetPrice}`,
        link: `${GetLink}`,
      };
      jsonFile.push(book);
    });
  }
  fs.writeFile('books1.json', JSON.stringify(jsonFile), (err) => {
    if (err) console.log('Error');
  });
};

const parse2 = async () => {
  for (let i = 1; i <= 34000; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const selector = await getHTML(
      `https://www.bookdepository.com/category/3391/Teen-Young-Adult?page=${i}`,
    );
    selector('.book-item').each((j, element) => {
      const GetTitle = selector(element).find('h3').text();
      const NewTitle = GetTitle.trim();
      const GetAuthor = selector(element).find('span').attr('itemscope');
      const GetPrice = selector(element).find('span.sale-price').text();
      const GetLink = `https://www.bookdepository.com/${selector(element).find('a').attr('href')}`;
      const GetImg = selector(element).find('div.item-img img').attr('data-lazy');
      const book = {
        title: `${NewTitle}`,
        author: `${GetAuthor}`,
        img: `${GetImg}`,
        price: `${GetPrice}`,
        link: `${GetLink}`,
      };
      jsonFile.push(book);
    });
    console.log(i);
  }
  fs.writeFile('books1.json', JSON.stringify(jsonFile), (err) => {
    if (err) console.log('Error');
  });
};
parse();
parse2();
