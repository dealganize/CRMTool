const CSVToJSON = require("csvtojson"),
  JSONToCSV = require("json2csv").parse,
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
          Android: {
            "Total Android Devices": android,
            "Facebook Host": androidFacebookHost,
            "Messenger Host": androidMessengerHost
          },
          iOS: {
            "Total iOS Devices": ios,
            "Facebook Host": iosFacebookHost,
            "Messenger Host": iosMessengerHost
          },
          Web: {
            "Total Web Browser": web,
            "Facebook Host": webFacebookHost,
            "Messenger Host": webMessengerHost
          }
        });
        var args = process.argv.slice(2);
        const gameName = gamesList.getGameName(args);
        const date = moment(new Date()).format("Do MMMM, YYYY");
        const fileName = gameName + "_" + date;
        const csv = JSONToCSV(updatedJson);
        fs.writeFileSync(`./${fileName}.csv`, csv);
        fs.unlinkSync("./feedback.csv");
      });
    return;
  }
};
