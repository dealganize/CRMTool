const puppeteer = require("puppeteer");
const CREDS = require("./creds");
let wait = ms => new Promise((r, j) => setTimeout(r, ms));

module.exports = {
  scrape: async () => {
    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://www.facebook.com/login/");

    const USERNAME_SELECTOR = "#email";
    const PASSWORD_SELECTOR = "#pass";
    const BUTTON_SELECTOR = "#loginbutton";

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    console.log("Finished login...");

    var args = process.argv.slice(2);

    if (args === undefined || args.length == 0) {
      console.error("No argument provided");
      return;
    }

    await page.goto(
      `https://developers.facebook.com/apps/${args}/instant-games/feedback/?business_id=1866079323706610`
    );
    await page.waitForNavigation();

    console.log("Entering clickExportButton...");

    const clickExportButton = async () => {
      try {
        const nodeList = document.querySelectorAll('[role="button"]');
        const items = {};

        for (let element of nodeList) {
          if (element.innerText === "Export to CSV") {
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

    console.log("Setting download behaviour...");
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: __dirname
    });

    console.log("wait...");
    await wait(10000);

    console.log("Downloaded feedback.csv...");

    console.log("Generated new aggregated file");
    browser.close();
  }
};
