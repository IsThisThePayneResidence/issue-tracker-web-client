var config = require('./config/config.global').config;
var amqp = require('amqplib/callback_api');

module.exports.Listener = function (queue, exchange, routingKey, callback) {
  amqp.connect(config.rabbitmq.uri, function(err, conn) {
    this.connection = conn;
    this.connection.createChannel(function(err, ch) {
      ch.assertExchange(exchange, 'fanout');

      ch.assertQueue(queue, {exclusive: true}, function(err, q) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        ch.bindQueue(q.queue, exchange, routingKey);

        ch.consume(q.queue, function(msg) {
          console.log(" [x] %s", msg.content.toString());
          callback(msg);
        }, {noAck: true});
      });
    });
  });
};

