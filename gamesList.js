let gamesList = [
  {
    id: 1920856321568946,
    name: "Cookie_Crush"
  },
  {
    id: 1255697821230772,
    name: "Candy_Match"
  },
  {
    id: 226466194579810,
    name: "Candy_Rain"
  },
  {
    id: 679085832284772,
    name: "Fish_Story"
  },
  {
    id: 1869354289823409,
    name: "Mahjong_Story_Match_Tiles"
  },
  {
    id: 755626824646698,
    name: "Solitaire_Story_Tripeaks3"
  }
];

module.exports = {
  getGameName: function(gameID) {
    var gameName = "";
    gamesList.find(game => {
      gameID == game.id ? (gameName = game.name) : null;
    });
    return gameName;
  }
};
