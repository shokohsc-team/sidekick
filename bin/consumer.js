'use strict';

const config = require('../src/config');
const amqp = require('amqplib');
const sendMatterMostMessage = require('../src/services/sendMatterMostMessage');
const all = require('bluebird').all;

function run() {
    const onError = require('./onError');
    const keys = ['#'];

    async function postMattermost(msg) {
        const content = JSON.parse(msg.content.toString());
        if ('minecraft' == content.container.name) {
            await sendMatterMostMessage(content.message);
        }
    }

    function logMessage(msg) {
      console.log(" [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString());
    }

    // Consumer
    amqp.connect('amqp://'+config.amqpHost+':'+config.amqpPort).then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {

    const ex = 'logstash';
    let ok = ch.assertExchange(ex, 'topic', {durable: true});

    ok = ok.then(function() {
      return ch.assertQueue('', {exclusive: false, autoDelete: true, expires: 30000, messageTtl: 60000, maxLength: 500});
    });

    ok = ok.then(function(qok) {
      var queue = qok.queue;
      return all(keys.map(function(rk) {
        ch.bindQueue(queue, ex, rk);
      })).then(function() { return queue; });
    });

    ok = ok.then(function(queue) {
      return ch.consume(queue, postMattermost, {priority: 10, noAck: true});
    });

    return ok.then(function() {
      console.log(' [*] Waiting for logs. To exit press CTRL+C.');
    });
  }).catch(onError);
}

run();
