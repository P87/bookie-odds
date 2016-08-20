var config = require('../../config/rabbit');
var amqp = require('amqplib/callback_api');

var Rabbit = {
	save: function(data) {
		amqp.connect(config.server, function(err, conn) {
			conn.createChannel(function(err, ch) {
				var q = config.sourceQueue;

				ch.assertQueue(q, {durable: false});
				// Note: on Node 6 Buffer.from(msg) should be used
				ch.sendToQueue(q, new Buffer(data));
			});
			setTimeout(function() { conn.close(); process.exit(0) }, 500);
			return true;
		});
	}
}

module.exports = Rabbit;