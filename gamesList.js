let gamesList = [
  {
    id: 1920856321568946,
    name: "Cookie_Crush"
  },
  {
    id: 1255697821230772,
    name: "Candy_Match"
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
