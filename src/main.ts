import { error } from "console";
import axios from "axios";
import jsdom from "jsdom";
const {JSDOM} = jsdom;

// число страниц на Авито
let numberPages: number = 2;
numberPages++;
// запрос получения всех объявлений по сдаваемым квартирам
const baseUrl = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0&p=";

async function findApartments(pageNumber: number) {
  let html: string;
  
  try {
    // применяем его к определённой странице
    const urlByPages: string = baseUrl + pageNumber;
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
  const items = document.querySelectorAll('[data-marker=item]');

  // будем хранить ссылки, заголовки и цены
  const newAds: any = [];

  // получаем нужные данные
  items.forEach(node => {
    // получаем ссылку на объявление
    newAds.push({
      id: node.id,
      url: 'https://avito.ru/' + node.querySelector('[itemprop=url]').getAttribute('href'),
      title: node.querySelector('[itemprop=name]').textContent,
      price: Number(node.querySelector('[itemprop=price]').getAttribute('content'))
    })
  })

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