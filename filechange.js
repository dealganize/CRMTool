// const _ = require("lodash"),
//   moment = require("moment"),
//   CONFIG = require("./config"),
//   gamesList = require("./gamesList.js"),
//   XLSX = require("xlsx");

// module.exports = {
//   formatJSON: function(json) {
//     var updatedObj = _.uniqBy(json, "PlayerID");
//     // this.createPlatformsArray(updatedObj);
//     var newObj = updatedObj.map(obj => {
//       for (var key in obj) {
//         if (key === "Timestamp") {
//           const formatted = moment.unix(obj.Timestamp).format("Do MMMM, YYYY");
//           obj[key] = obj[key].replace(obj[key], formatted);
//         }
//       }
//       return obj;
//     });
//     return newObj;
//   },
//   createXLSX: function() {
//     const gameName = gamesList.getGameName(CONFIG.processArgs);
//     const date = moment(new Date()).format("Do MMMM, YYYY");
//     const fileName = gameName + "_" + date;

//     var book = XLSX.utils.book_new();
//     var sheet = XLSX.utils.json_to_sheet(finalJson);
//     XLSX.utils.book_append_sheet(book, sheet, "test");
//     XLSX.writeFile(book, `${fileName}.xlsx`);
//   },
//   createPlatformsArray: function(json) {
//     var getUniquePlatforms = _.uniqBy(json, "Platform");
//     const platformsList = getUniquePlatforms.map(obj => obj.Platform);
//     CONFIG.platforms.push(...platformsList);
//     return;
//   },
//   updateJson: updatedJson => {
//     console.log("CONFIG.platforms", CONFIG.platforms);
//     let android = 0,
//       ios = 0,
//       web = 0,
//       facebookApp = 0,
//       messenger = 0,
//       total = 0;

//     for (var i = 0; i < updatedJson.length; i++) {
//       if (updatedJson[i].Platform === "ANDROID") {
//         android++;
//       }
//       if (updatedJson[i].Platform === "IOS") {
//         ios++;
//       }

//       if (updatedJson[i].Platform === "WEB") {
//         web++;
//       }
//       if (updatedJson[i].Host_Application === "FACEBOOK") {
//         facebookApp++;
//       }
//       if (updatedJson[i].Host_Application === "MESSENGER") {
//         messenger++;
//       }
//       total++;
//     }
//     updatedJson.unshift({
//       "Total Unique Users": total,
//       "Total Facebook Host": facebookApp,
//       "Total Messenger Host": messenger,
//       "Total Android Devices": android,
//       "Total iOS Devices": ios,
//       "Total Web Browser": web
//     });

//     return updatedJson;
//   }
// };
