const _ = require("lodash"),
  moment = require("moment"),
  gamesList = require("./gamesList.js"),
  XLSX = require("xlsx");

module.exports = {
  formatJSON: async function(json) {
    let formatedJson = json.map(obj => {
      return remap(obj, "Timestamp", "Date", "Total_Memory", "Label", "");
      function remap(
        obj,
        timestampKey,
        dateKey,
        memoryKey,
        labelKey,
        emptyValue
      ) {
        const result = {};
        const keys = Object.keys(obj);
        for (const key of keys) {
          result[key] = obj[key];
          if (key === timestampKey) {
            const formatted = moment
              .unix(obj.Timestamp)
              .format("Do MMMM, YYYY");
            result[dateKey] = formatted;
          }
          if (key === memoryKey) {
            result[labelKey] = emptyValue;
          }
        }
        return result;
      }
    });

    formatedJson = await this.formatedJsonUniqueUsersPerDay(formatedJson);

    return formatedJson;
  },
  formatedJsonUniqueUsersPerDay: function(formatedJson) {
    var formatedJsonUniqueUsersPerDay = _.uniqBy(formatedJson, obj =>
      [obj.Date, obj.PlayerID].join()
    );
    return formatedJsonUniqueUsersPerDay;
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
