const CSVToJSON = require("csvtojson");
(fs = require("fs")),
  (_ = require("lodash")),
  (HELPERS = require("./helpers.js"));

module.exports = {
  formater: async gameId => {
    await CSVToJSON()
      .fromFile("./feedback.csv")
      .then(json => {
        var formatedJson = HELPERS.formatJSON(json);
        return formatedJson;
      })
      .then(finalJson => {
        HELPERS.createXLSX(finalJson, gameId);
        fs.unlinkSync("./feedback.csv");
        return;
      });
  }
};
