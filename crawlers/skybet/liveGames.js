/**
 * Get the source code for the page containing a list of live games and
 * add the source to our queue.
 */

var request = require('request');
var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var dataDriver = require('../../utils/data/' + projectConfig.saver);

request({
	uri: skybetConfig.liveUrl,
}, function(error, response, body) {
	if (error) {
		throw 'Error retrieving live games on SkyBet: ' + error;
	}

	console.log(skybetConfig.liveUrl + ' scraped. Adding to queue...');
	dataDriver.save('sourceQueue', JSON.stringify({site: 'skybet', content: body}));
});
