const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const createJson = () => {
  const jsonFile = [];
  const parse = async () => {
    const getHTML = async (url) => {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    };

    const PagesOfSite = await getHTML('https://www.yakaboo.ua/ua/knigi/hudozhestvennaja-literatura/ukrainskaja-literatura.html?p=1');
    // eslint-disable-next-line no-unused-vars
    const pageNumber = PagesOfSite('a.last').text();
    // console.log($.html());
    // console.log(pageNumber);
    for (let i = 1; i <= 1; i += 1) {
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
      fs.writeFile('books.json', JSON.stringify(jsonFile), (err) => {
        if (err) console.log('Error');
      });
    }
  };
  parse();
};
export default createJson;
// https://buch-in-der-au.buchkatalog.de/webapp/wcs/stores/servlet/RecommendationProductView/56227/10002/-3/955400354/Neuheiten
