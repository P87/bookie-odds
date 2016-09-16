/**
 * Get the source of a page from our queue, grab a list of live match urls
 * and add the urls to our queue.
 */

var projectConfig = require('../config/project');
var dataDriver = require('../utils/data/' + projectConfig.saver);

var LiveMatches = {
    run: function() {
        dataDriver.get('sourceQueue', function(msg, ch) {
            var data = JSON.parse(msg.content.toString());
            var parser = require('../parsers/' + data.site + '/liveMatches');
            var matches = parser.getMatches(data.content);

            matches.forEach(function(match) {
                dataDriver.save(
                    'matchQueue',
                    JSON.stringify({
                        site: data.site,
                        match: match
                    })
                );
            });

            ch.ack(msg);
        });
    }
}
module.exports = LiveMatches;
