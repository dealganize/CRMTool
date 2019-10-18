const _ = require("lodash"),
  moment = require("moment"),
  CONFIG = require("./config"),
  gamesList = require("./gamesList.js"),
  XLSX = require("xlsx");

module.exports = {
  formatJSON: function(json) {
    var newJsonFormatedTimestamp = json.map(obj => {
      for (var key in obj) {
        if (key === "Timestamp") {
          const formatted = moment.unix(obj.Timestamp).format("Do MMMM, YYYY");
          obj[key] = obj[key].replace(obj[key], formatted);
        }
      }
      return obj;
    });

    //
    var formatedJsonUniqueUsersPerDay = _.uniqBy(
      newJsonFormatedTimestamp,
      obj => [obj.Timestamp, obj.PlayerID].join()
    );

    var formatedJson = this.addEmptyColumn(formatedJsonUniqueUsersPerDay);

    return formatedJson;
  },
  addEmptyColumn: function(formatedJson) {
    formatedJson = formatedJson.map(obj => {
      return remap(obj, "Total_Memory", "Label", "");
      function remap(obj, afterKey, newKey, newValue) {
        const result = {};
        const keys = Object.keys(obj);
        for (const key of keys) {
          result[key] = obj[key];
          if (key === afterKey) {
            result[newKey] = newValue;
          }
        }
        return result;
      }
    });
    return formatedJson;
  },
  createXLSX: function(finalJson) {
    const gameName = gamesList.getGameName(CONFIG.processArgs);
    const date = moment(new Date()).format("Do MMMM, YYYY");
    const fileName = gameName + "_" + date;

    var book = XLSX.utils.book_new();
    var sheet = XLSX.utils.json_to_sheet(finalJson);
    XLSX.utils.book_append_sheet(book, sheet, "test");
    // console.log(`${process.env.SHARED_FOLDER}${fileName}.xlsx`);
    // XLSX.writeFile(book, `${fileName}.xlsx`);
    XLSX.writeFile(book, `${process.env.SHARED_FOLDER}${fileName}.xlsx`);
    return;
  }
};
