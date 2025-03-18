var request = require("request");

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/players/profiles',
  qs: {player: '276'},
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key':  '192ceca6fc7247848c38a7416f91ae63',
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});
