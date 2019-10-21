const _ = require("lodash"),
  moment = require("moment"),
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

    var formatedJsonUniqueUsersPerDay = _.uniqBy(
      newJsonFormatedTimestamp,
      obj => [obj.Timestamp, obj.PlayerID].join()
    );

    const formatedJson = this.addEmptyColumn(formatedJsonUniqueUsersPerDay);
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
  createXLSX: function(finalJson, gameId) {
    const gameName = gamesList.getGameName(gameId);
    const date = moment(new Date()).format("Do MMMM, YYYY");
    const fileName = gameName + "_" + date;
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(finalJson);
    XLSX.utils.book_append_sheet(book, sheet, "test");
    // XLSX.writeFile(book, `${fileName}.xlsx`);
    XLSX.writeFile(book, `${process.env.SHARED_FOLDER}${fileName}.xlsx`);
    return;
  }
};
