var projectConfig = require('../config/project');
var skybetConfig = require('../config/skybet');
var dataDriver = require('../utils/data/' + projectConfig.saver);

dataDriver.get('matchQueue', function(msg, ch) {
	var data = JSON.parse(msg.content.toString());
    var crawler = require('../crawlers/' + data.site + '/match');
    crawler.crawl(data.match);
	ch.ack(msg);
});
