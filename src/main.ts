import axios from "axios";
import { clear, error, log } from "console";
import jsdom from "jsdom";
const {JSDOM} = jsdom;

(async () => {
  let html: string;
  try {
    // формируем запрос получения всех объявлений по сдаваемым квартирам
    const baseUrl = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0&p=";
    // применяем его к определённой странице
    const urlByPages: string = baseUrl + 1;
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

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const items = document.querySelectorAll('[data-marker=item]');
  
  // будем хранить ссылки, заголовки и цены
  const newAds: any = {};

  // получаем нужные данные
  items.forEach(node => {
    newAds[node.id] = {
      url: node.querySelector('[itemprop=url]').getAttribute('href'),
      title: node.querySelector('[itemprop=name]').textContent,
      price: Number(node.querySelector('[itemprop=price]').getAttribute('content'))
    }
  })

  // показываем в консоли результат
  clear();
  log("result:", newAds); 
})()