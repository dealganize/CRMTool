const scraper = require("./scraper.js"),
  updatedCsv = require("./csvFormater.js");

async function generateFormatedCsv() {
  await scraper.scrape();
  const formatedCsv = await updatedCsv.formater();
  return formatedCsv;
}

generateFormatedCsv();
