import axios from "axios";
import { clear, error, log } from "console";
import jsdom from "jsdom";
const {JSDOM} = jsdom;

(async ()=> {
  let html: string;
  try {
    // const url = "https://www.avito.ru/moskva/telefony?q=airtag&s=104";
    const url = "https://www.avito.ru/velikiy_novgorod/kvartiry/sdam/na_dlitelnyy_srok/1-komnatnye-ASgBAQICAkSSA8gQ8AeQUgFAzAgUjlk?context=H4sIAAAAAAAA_0q0MrSqLraysFJKK8rPDUhMT1WyLrYyNLNSKk5NLErOcMsvyg3PTElPLVGyrgUEAAD__xf8iH4tAAAA&localPriority=0";
    const resp = await axios.get(url);
    
    html = resp.data;
  } catch (e) {
      if (axios.isAxiosError(e)) {
        error(e);
      } else {
        error(e);
      }
  }

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const items = document.querySelectorAll('[data-marker=item]');

  clear();

  const newAds: any = {};

  items.forEach(node => {
    newAds[node.id] = {
      url: node.querySelector('[itemprop=url]').getAttribute('href'),
      title: node.querySelector('[itemprop=name]').textContent,
      price: Number(node.querySelector('[itemprop=price]').getAttribute('content'))
    }
  })

  // items.forEach(node => {
  //   newAds[node.id] = {
  //     id: node.id,
  //     url: node.querySelector('[itemprop=url]').getAttribute('href'),
  //     title: node.querySelector('[itemprop=name]').textContent,
  //     price: Number(node.querySelector('[itemprop=price]').getAttribute('content'))
  //   }
  // })

  log("newAds:", newAds); 
})()