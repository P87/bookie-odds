var projectConfig = require('../config/project');
var skybetConfig = require('../config/skybet');
var dataDriver = require('../utils/data/' + projectConfig.saver);

dataDriver.get('sourceQueue', function(msg) {
	var data = JSON.parse(msg.content.toString());
	var parser = require('../parsers/' + data.site + '/liveGames');
	var games = parser.getGames(data.content);

	games.forEach(function(game) {
		dataDriver.save(
			'matchQueue',
			JSON.stringify({
				site: data.site,
				match: game
			})
		);
	});
});
