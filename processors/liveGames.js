/**
 * Get the source of a page from our queue, grab a list of live match urls
 * and add the urls to our queue.
 */

var projectConfig = require('../config/project');
var dataDriver = require('../utils/data/' + projectConfig.saver);

dataDriver.get('sourceQueue', function(msg, ch) {
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

	ch.ack(msg);
});
