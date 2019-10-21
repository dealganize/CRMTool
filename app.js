const scraper = require("./scraper.js"),
  updatedCsv = require("./csvFormater.js"),
  listOfGames = require("./gamesList.js");

require("dotenv").config();

async function generateFormatedCsv(gameId) {
  await scraper.scrape(gameId);
  await updatedCsv.formater(gameId);
}

async function start() {
  var games = listOfGames.gamesList;
  for (var i = 0, count = games.length; i < count; i++) {
    await generateFormatedCsv(games[i].id);
  }
  return;
}

start();
