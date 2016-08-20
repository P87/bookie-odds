var request = require('request');
var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var dataDriver = require('../../utils/data/' + projectConfig.saver); 

request({
	uri: skybetConfig.liveUrl,
}, function(error, response, body) {
	dataDriver.save(body);
});