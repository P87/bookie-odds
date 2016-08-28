/**
 * Get the source of a live match page from our queue and store the
 * odds/stats.
 */

var projectConfig = require('../config/project');
var dataDriver = require('../utils/data/' + projectConfig.saver);

var MatchSource = {
	run: function() {
		dataDriver.get('matchSourceQueue', function(msg, ch) {
			var data = JSON.parse(msg.content.toString());
		    var parser = require('../parsers/' + data.site + '/match');
			var teams = parser.getTeams(data.content);
		    var stats = parser.getStats(data.content);

			// @todo Save data and acknowledge message
			// ch.ack(msg);
		});
	}
}

module.exports = MatchSource;
