/**
 * Get the source of a live match page from our queue and store the
 * odds/stats.
 */

var projectConfig = require('../config/project');
var queueDriver = require('../utils/queue/' + projectConfig.queueDriver);
// var mongo = require('../utils/data/mongo');

var MatchSource = {
    run: function() {
        queueDriver.get('matchSourceQueue', function(msg, ch) {
            var data = JSON.parse(msg.content.toString());
            var parser = require('../parsers/' + data.site + '/match');

            var teams = parser.getTeams(data.content);
            var score = parser.getScore(data.content);
            var stats = parser.getStats(data.content);

            // @todo parse the odds
            // ch.ack(msg);
});
}
}

module.exports = MatchSource;
