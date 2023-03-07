import { error } from "console";
import axios from "axios";
import jsdom from "jsdom";
const {JSDOM} = jsdom;

// число страниц на Авито
let numberPages: number = 2;
numberPages++;
// запрос получения всех объявлений по сдаваемым квартирам
// const baseUrl0 = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0&p=";

// const baseUrl1 = "https://novgorod.cian.ru/snyat-kvartiru/";
const baseUrlPartFirst = "https://novgorod.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=flat&p=";
const baseUrlPartSecond = "&region=4694&type=4";

async function findApartments(pageNumber: number) {
  let html: string;
  
  try {
    // применяем его к определённой странице
    const urlByPages: string = baseUrlPartFirst + pageNumber + baseUrlPartSecond;
    // получаем все объявления
    const resp = await axios.get(urlByPages);
    // сохраняем их в переменную
    html = resp.data;
  } catch (e) {
    // если возникли ошибки
    if (axios.isAxiosError(e)) {
      error(e);
    } else {
      error(e);
    }
  }

  // приводим данные с Авито к удобному для работы виду
  const dom = new JSDOM(html);
  const document = dom.window.document;

  console.clear();
  console.log("document = ", document);

  // const items = document.querySelectorAll('[data-marker=item]');

  // будем хранить ссылки, заголовки и цены
  const newAds: any = [];

  // получаем нужные данные
  // items.forEach(node => {  
  //   const content = node.textContent;   

  //   // получаем ссылку на объявление
  //   newAds.push({
  //     id: node.id,
  //     url: 'https://avito.ru/' + node.querySelector('[itemprop=url]').getAttribute('href'),
  //     title: node.querySelector('[itemprop=name]').textContent,
  //     price: Number(node.querySelector('[itemprop=price]').getAttribute('content')),
  //     realtor: content.indexOf('Агентство') != -1 ? true : false,
  //     rooms: content.indexOf('1-к.') != -1 ? 1 : content.indexOf('2-к.') != -1 ? 2 : 3,
  //     collateral: content.indexOf('залога') != -1 ? false : true
  //   })
  // })

  // отдаём браузеру результат
  return newAds;
}

// создаём место для хранения квартирных данных со всех страниц
let output: any = [];

// получаем все квартиры с каждой страницы
for (let i = 1; i < numberPages; i++) {
  let pageData = await findApartments(i);
  output.push(pageData);
}

export default output;