const CSVToJSON = require("csvtojson"),
  XLSX = require("xlsx"),
  moment = require("moment"),
  fs = require("fs"),
  _ = require("lodash"),
  gamesList = require("./gamesList.js");

module.exports = {
  formater: async () => {
    await CSVToJSON()
      .fromFile("./feedback.csv")
      .then(source => {
        var updatedObj = _.uniqBy(source, "PlayerID");
        var newObj = updatedObj.map(obj => {
          for (var key in obj) {
            if (key === "Timestamp") {
              const formatted = moment
                .unix(obj.Timestamp)
                .format("Do MMMM, YYYY");
              obj[key] = obj[key].replace(obj[key], formatted);
            }
          }
          return obj;
        });
        return newObj;
      })
      .then(updatedJson => {
        let android = 0,
          androidFacebookHost = 0,
          androidMessengerHost = 0,
          ios = 0,
          iosFacebookHost = 0,
          iosMessengerHost = 0,
          web = 0,
          webFacebookHost = 0,
          webMessengerHost = 0,
          facebookApp = 0,
          messenger = 0,
          total = 0;

        for (var i = 0; i < updatedJson.length; i++) {
          if (updatedJson[i].Platform === "ANDROID") {
            android++;
          }
          if (
            updatedJson[i].Platform === "ANDROID" &&
            updatedJson[i].Host_Application === "FACEBOOK"
          ) {
            androidFacebookHost++;
          }
          if (
            updatedJson[i].Platform === "ANDROID" &&
            updatedJson[i].Host_Application === "MESSENGER"
          ) {
            androidMessengerHost++;
          }

          if (updatedJson[i].Platform === "IOS") {
            ios++;
          }
          if (
            updatedJson[i].Platform === "IOS" &&
            updatedJson[i].Host_Application === "FACEBOOK"
          ) {
            iosFacebookHost++;
          }
          if (
            updatedJson[i].Platform === "IOS" &&
            updatedJson[i].Host_Application === "MESSENGER"
          ) {
            iosMessengerHost++;
          }
          if (updatedJson[i].Platform === "WEB") {
            web++;
          }
          if (
            updatedJson[i].Platform === "WEB" &&
            updatedJson[i].Host_Application === "FACEBOOK"
          ) {
            webFacebookHost++;
          }
          if (
            updatedJson[i].Platform === "WEB" &&
            updatedJson[i].Host_Application === "MESSENGER"
          ) {
            webMessengerHost++;
          }
          if (updatedJson[i].Host_Application === "FACEBOOK") {
            facebookApp++;
          }
          if (updatedJson[i].Host_Application === "MESSENGER") {
            messenger++;
          }
          total++;
        }
        updatedJson.unshift({
          "Total Unique Users": total,
          "Total Facebook Host": facebookApp,
          "Total Messenger Host": messenger,
          "Total Android Devices": android,
          "Total iOS Devices": ios,
          "Total Web Browser": web
        });

        return updatedJson;
      })
      .then(finalJson => {
        var args = process.argv.slice(2);

        const gameName = gamesList.getGameName(args);
        const date = moment(new Date()).format("Do MMMM, YYYY");
        const fileName = gameName + "_" + date;

        var book = XLSX.utils.book_new();
        var sheet = XLSX.utils.json_to_sheet(finalJson);
        XLSX.utils.book_append_sheet(book, sheet, "test");

        // XLSX.writeFile(
        //   book,
        //   `/run/user/1001/gvfs/smb-share:server=nas.local,share=projekte/FB Messenger & Pages/Dashboards/Users Feedback/${fileName}.xlsx`
        // );
        XLSX.writeFile(book, `${fileName}.xlsx`);
        fs.unlinkSync("./feedback.csv");
      });
  }
};
