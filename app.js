const CSVToJSON = require('csvtojson'),
	JSONToCSV = require('json2csv').parse,
	moment = require('moment'),
	fs = require('fs'),
	_ = require('lodash'),
	scraper = require('./scraper.js'),
	updatedCsv = require('./csvFormater.js');

async function generateFormatedCsv() {
	await scraper.scrape();
	const formatedCsv = await updatedCsv.formater();
	return formatedCsv;
}

generateFormatedCsv();
