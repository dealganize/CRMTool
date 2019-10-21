// Puppeteer connection --> file download

const PUPPETEER = require("puppeteer");

let wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

module.exports = {
  scrape: async gameId => {
    const browser = await PUPPETEER.launch({
      headless: true // set to false - see live browser behaviour
    });

    const page = await browser.newPage();

    const USERNAME_SELECTOR = "#email",
      PASSWORD_SELECTOR = "#pass",
      BUTTON_SELECTOR = "#loginbutton";

    // Wait until page has loaded and for log in form
    await Promise.all([
      page.goto(`${process.env.FB_URL}/login`),
      page.waitForSelector(USERNAME_SELECTOR),
      page.waitForSelector(PASSWORD_SELECTOR),
      page.waitForSelector(BUTTON_SELECTOR)
    ]);

    // Enter username and password
    await page.type(USERNAME_SELECTOR, process.env.FB_USERNAME);
    await page.type(PASSWORD_SELECTOR, process.env.FB_PASSWORD);

    // Submit log in credentials and wait for navigation
    await Promise.all([page.click(BUTTON_SELECTOR), page.waitForNavigation()]);

    console.log("Finished login...");

    // Wait until developers portal loads
    await Promise.all([
      page.goto(
        `${process.env.FB_DEVELOPERS_URL}/apps/${gameId}/instant-games/feedback/?business_id=${process.env.BUSINESS_ID}`
      ),
      page.waitForNavigation()
    ]);

    console.log("Entering clickExportButton...");

    // Export CSV
    const clickExportButton = async () => {
      try {
        const items = {};
        const nodeList = document.querySelectorAll('[role="button"]');

        for (let element of nodeList) {
          if (element.innerText === "Export to CSV") {
            await element.click();
            items.link = element.className;
          }
        }
        return items;
      } catch (err) {
        throw err;
      }
    };

    await Promise.all([
      page.evaluate(clickExportButton),
      page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: __dirname
      }),
      wait(10000)
    ]);

    browser.close();
  }
};
