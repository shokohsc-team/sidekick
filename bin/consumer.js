'use strict';

const config = require('../src/config');
const amqp = require('amqplib');
const mattermost = require('../src/services/mattermost');
const basename = require('path').basename;
const all = require('bluebird').all;

function run() {
    const onError = require('./onError');
    var keys = ['#'];
    // var keys = process.argv.slice(2);
    // if (keys.length < 1) {
    //   console.log('Usage: %s pattern [pattern...]',
    //               basename(process.argv[1]));
    //   process.exit(1);
    // }

    // Consumer
    amqp.connect('amqp://'+config.amqpHost+':'+config.amqpPort).then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {


        var ex = 'logstash';
        var ok = ch.assertExchange(ex, 'topic', {durable: true});

        ok = ok.then(function() {
          return ch.assertQueue('', {exclusive: false});
        });


        ok = ok.then(function(qok) {
          var queue = qok.queue;
          return all(keys.map(function(rk) {
              console.log(rk);
            ch.bindQueue(queue, ex, rk);
          })).then(function() { return queue; });
        });

        ok = ok.then(function(queue) {
          return ch.consume(queue, logMessage, {noAck: true});
        });
        return ok.then(function() {
          console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });

        function logMessage(msg) {
            const content = JSON.parse(msg.content.toString());
            console.log(content.container.name + ': '+content.message);
        //   console.log(" [x] %s:'%s'",
        //               msg.fields.routingKey,
        //               msg.content.toString());
        }

      return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, async function(msg) {
          if (msg !== null) {
            console.log(msg.content.toString());
            // if (void 0 !== config.mattermostWebhookUrl) {
            //     await mattermost.send({
            //         text: msg.content.toString(),
            //         channel: '#minecraft',
            //         username: 'minecraft'
            //     });
            // }
            ch.ack(msg);
          }
        });
      });
      // }).catch(onError);
  }).catch(function(err) {console.log(err)});
}

run();
