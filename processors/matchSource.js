/**
 * Get the source of a live match page from our queue and store the
 * odds/stats.
 */

var projectConfig = require('../config/project.json');
var queueDriver = require('../utils/queue/' + projectConfig.queueDriver);
var dataDriver = require('../utils/data/' + projectConfig.dataDriver);

var MatchSource = {
    run: function() {
        queueDriver.get('matchSourceQueue', function(msg, ch) {
            var data = JSON.parse(msg.content.toString());
            var parser = require('../parsers/' + data.site + '/match');
            var matchData = parser.parseSource(data.content);

            log.info(matchData);

            dataDriver.saveMatchInfo(matchData, function() {
                ch.ack(msg);
            });
            // @todo parse the odds
        });
    }
}

module.exports = MatchSource;
