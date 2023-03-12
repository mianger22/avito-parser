// переименовать в parserAvito
// ~ настроить перевод этого файла из ts в js
import { error, log } from "console";
import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

// сколько всего страниц
let numberPages: number = 2;
numberPages++;

const selectorCian = '[data-name=CardComponent]';

const baseUrl = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0&p=";


// создаём место для хранения квартирных данных со всех страниц
// let allPagesAdsAvito: any = [], 
let allPagesAdsCian: any = [];
let listBlocksNecessary: any = [];

// функция получения по селектору необходимых блоков
async function getSelectorsNecessary(urlToService: string, selector: string) {
  let html: string;
  
  try {
    // получаем все объявления
    let response = await axios.get(urlToService);
    // сохраняем их в переменную
    html = response.data;
  } catch (e) {
    // если возникли ошибки
    if (axios.isAxiosError(e)) {
      error(e);
    } else {
      error(e);
    }
  }

  // приводим данные к удобному для работы виду
  const document = new JSDOM(html).window.document;
  // получаем сами обявления
  return document.querySelectorAll(selector);
}

// получаем необходимые блоки и обрабатываем их
(async function () {
  // проходимся по каждой странице и сохраняем в один массив нужные нам блоки
  for (let i = 1; i < numberPages; i++) {
    const urlAvito: string = baseUrl + i;
    const selectors = await getSelectorsNecessary(urlAvito, selectorCian)

    listBlocksNecessary.push(selectors);
  }
})().then(() => {
  // вынимаем из этого массива нужные нам данные
  for (let v = 0; v < listBlocksNecessary.length; v++) {
   // здесь будем хранить данные объявления
   const dataAds: any = [];
    
   // получаем нужные данные и сохраняем
   listBlocksNecessary[v].forEach((node: any) => {  
     // получаю всю карточку в текстовом виде
     const content = node.textContent;  

     // заголовок объявления, количество комнат и цена
     const title = node.querySelector('[data-mark=OfferTitle] > span').textContent;
     const numberRooms = title.slice(0, 1);
     let price = node.querySelector('[data-mark=MainPrice] > span').textContent;
     price = price.substr(0, price.length - 11) + "000";

     dataAds.push({
       id: numberRooms + price + Math.round(Math.random() * 9),
       url: node.querySelector('[data-name=LinkArea] > a').getAttribute('href'),
       title: title,
       price: +price,
       realtor: content.indexOf('Собственник') != -1 ? false : true,
       rooms: +numberRooms, 
       collateral: content.indexOf('залога') != -1 ? false : true
     })
   })

   allPagesAdsCian.push(dataAds);
  }

  log("Resultat:", allPagesAdsCian);
})

export default allPagesAdsCian