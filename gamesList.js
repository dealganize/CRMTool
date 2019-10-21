module.exports = {
  getGameName: function(gameID) {
    var gameName = "";
    this.gamesList.find(game => {
      gameID == game.id ? (gameName = game.name) : null;
    });
    return gameName;
  },
  gamesList: [
    {
      id: 1920856321568946,
      name: "User_Feedback_Cookie_Crush"
    },
    {
      id: 1255697821230772,
      name: "User_Feedback_Candy_Match"
    },
    {
      id: 226466194579810,
      name: "User_Feedback_Candy_Rain"
    },
    {
      id: 679085832284772,
      name: "User_Feedback_Fish_Story"
    },
    {
      id: 1869354289823409,
      name: "User_Feedback_Mahjong_Story_Match_Tiles"
    },
    {
      id: 755626824646698,
      name: "User_Feedback_Solitaire_Story_Tripeaks3"
    }
  ]
};
