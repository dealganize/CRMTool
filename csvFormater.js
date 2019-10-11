const CSVToJSON = require("csvtojson");
(fs = require("fs")),
  (_ = require("lodash")),
  (HELPERS = require("./helpers.js"));

module.exports = {
  formater: async () => {
    await CSVToJSON()
      .fromFile("./feedback.csv")
      .then(source => {
        var formatedJson = HELPERS.formatJSON(source);
        return formatedJson;
      })
      .then(finalJson => {
        HELPERS.createXLSX(finalJson);
        fs.unlinkSync("./feedback.csv");
        return;
      });
  }
};
