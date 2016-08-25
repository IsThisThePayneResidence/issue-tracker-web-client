import { config } from './config/config.global'

import * as amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

export function Publisher(exchange) {
  amqp.connect(config.rabbitmq.uri, function(err, conn) {
    this.connection = conn;
    this.connection.createChannel(function(err, ch) {
      this.channel = ch;
      var ex = 'logs';
      var msg = process.argv.slice(2).join(' ') || 'Hello World!';

      this.channel.assertExchange(ex, 'fanout', {durable: false});
      this.channel.publish(exchange, '', new Buffer(msg));
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });

  console.log(amqp);
  this.connection = amqp.createConnection({host: config.rabbitmq.uri});
  this.exchange = null;
  var conn = this.connection;
  this.connection.on('error', function (e) {
    console.log("Error from amqp: ", e);
  });

  this.connection.on('ready', function () {
    conn.exchange(exchange, {'type': 'fanout'}, function (ex) {
      this.exchange = ex;
    });
  });

  this.send = function (routingKey, message) {
    this.exchange.publish(routingKey, message, {'replyTo': 'q.all.client.response', 'correlationId': Math.random().toString()})
  };

}