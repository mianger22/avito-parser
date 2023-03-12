import { error, log } from "console";
import axios from "axios";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

// общая функция парсинга страниц
async function findApartments(urlToService: string, selector: string) {
  
}
   
// получаем все нужные данные сдаваемых квартир на Циане и Авито


// теперь применяем парсинг ко всем страницам

// получаем все квартиры с каждой страницы
// for (let i = 1; i < numberPages; i++) {
//   setTimeout(() => {
//     const urlAvito: string = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0&p=" + i;
//     const selectorAvito = '[data-marker=item]';

//     const adsAvito = findApartments(urlAvito, selectorAvito).then(res => {  
//       // здесь будем хранить данные объявления
//       const dataAds: any = [];
      
//       // получаем нужные данные и сохраняем
//       res.forEach(node => {  
//         const content = node.textContent;   
    
//         // получаем ссылку на объявление
//         dataAds.push({
//           id: node.id,
//           url: 'https://avito.ru/' + node.querySelector('[itemprop=url]').getAttribute('href'),
//           title: node.querySelector('[itemprop=name]').textContent,
//           price: Number(node.querySelector('[itemprop=price]').getAttribute('content')),
//           realtor: content.indexOf('Агентство') != -1 ? true : false,
//           rooms: content.indexOf('1-к.') != -1 ? 1 : content.indexOf('2-к.') != -1 ? 2 : 3,
//           collateral: content.indexOf('залога') != -1 ? false : true
//         })
//       })

//       return dataAds;
//     });

//     allPagesAdsAvito.push(adsAvito);
//   }, 2000)
// }

// let commonAds = [...allPagesAdsAvito, ...allPagesAdsCian];

log("Result:", allPagesAdsCian);

// получаем все квартиры с каждой страницы
export default allPagesAdsCian;
