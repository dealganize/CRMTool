const XLSX = require("xlsx");

var json = [
  {
    Timestamp: "6th October, 2019",
    PlayerID: "1781121508642999",
    Locale: "fr_CA",
    Platform: "WEB",
    Host_Application: "MESSENGER",
    App_Version: "",
    Operating_System: "Windows 10",
    Screen_Resolution_Height: "",
    Screen_Resolution_Width: "",
    Total_Memory: "",
    Feedback_Text:
      "[something_else,loading_issues] le jeu n ouvre pas cookie crush",
    Country: "CA",
    Language: "fr",
    Hosted_Asset_Version: "1275"
  },
  {
    Timestamp: "6th October, 2019",
    PlayerID: "1194688193967611",
    Locale: "en_US",
    Platform: "ANDROID",
    Host_Application: "FACEBOOK",
    App_Version: "",
    Operating_System: "Android 8.0.0",
    Screen_Resolution_Height: "",
    Screen_Resolution_Width: "",
    Total_Memory: "",
    Feedback_Text: "[something_else,loading_issues]",
    Country: "US",
    Language: "en",
    Hosted_Asset_Version: "1275"
  }
];

var newWb = XLSX.utils.book_new();
var newWs = XLSX.utils.json_to_sheet(json);
XLSX.utils.book_append_sheet(newWb, newWs);

XLSX.writeFile(newWb, "test_data.xlsx");
