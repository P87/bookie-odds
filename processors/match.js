/**
 * Get a url for a live game out of the queue and crawl it.
 */

var projectConfig = require('../config/project');
var dataDriver = require('../utils/data/' + projectConfig.saver);

dataDriver.get('matchQueue', function(msg, ch) {
	var data = JSON.parse(msg.content.toString());
    var crawler = require('../crawlers/' + data.site + '/match');
    crawler.crawl(data.match);
	ch.ack(msg);
});
