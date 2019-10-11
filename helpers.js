const _ = require("lodash"),
  moment = require("moment"),
  CONFIG = require("./config"),
  gamesList = require("./gamesList.js"),
  XLSX = require("xlsx");

module.exports = {
  formatJSON: function(json) {
    var updatedObj = _.uniqBy(json, "PlayerID");
    var newObj = updatedObj.map(obj => {
      for (var key in obj) {
        if (key === "Timestamp") {
          const formatted = moment.unix(obj.Timestamp).format("Do MMMM, YYYY");
          obj[key] = obj[key].replace(obj[key], formatted);
        }
      }
      return obj;
    });
    return newObj;
  },
  createXLSX: function(finalJson) {
    const gameName = gamesList.getGameName(CONFIG.processArgs);
    const date = moment(new Date()).format("Do MMMM, YYYY");
    const fileName = gameName + "_" + date;

    var book = XLSX.utils.book_new();
    var sheet = XLSX.utils.json_to_sheet(finalJson);
    XLSX.utils.book_append_sheet(book, sheet, "test");
    console.log(`${process.env.SHARED_FOLDER}${fileName}.xlsx`);
    XLSX.writeFile(book, `${process.env.SHARED_FOLDER}${fileName}.xlsx`);
    return;
  }
};
