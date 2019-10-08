const puppeteer = require('puppeteer');
const CREDS = require('./creds');
let wait = ms => new Promise((r, j) => setTimeout(r, ms));


async function run() {

  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  
  await page.goto('https://www.facebook.com/login/');

  const USERNAME_SELECTOR = '#email';
  const PASSWORD_SELECTOR = '#pass';
  const BUTTON_SELECTOR = '#loginbutton';

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();

  console.log('Finished login...');
  
  await page.goto('https://developers.facebook.com/apps/755626824646698/instant-games/feedback/?business_id=1866079323706610');
  await page.waitForNavigation();

  //await page.$eval('#developer_app_body > div > div._4-u3._3a8w.noPadding > div > div.clearfix._3-96 > div > div > a', elem => elem.click());

  console.log("Entering clickExportButton...");

  const clickExportButton = async () => {
    try {
      const nodeList = document.querySelectorAll('[role="button"]');
      const items = {};
      //expButton = expButton[2];
  
      for (let element of nodeList) {
        if (element.innerText === 'Export to CSV') {
          await element.click();
          items.link = element.className; //what do?
        }
      }
  
      return items;
    } catch (err) {
      throw err;
    }
  };

  await page.evaluate(clickExportButton);

  console.log('Setting download behaviour...');
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: '../../Downloads/'
  });

  console.log("Download behaviour set...");

  console.log('wait');
  await wait(10000);

  console.log('download');
  //await page.evaluate(download);

  await wait(30000); 

  console.log('Fin')
}

run();