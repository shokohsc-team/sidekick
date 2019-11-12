'use strict';

const config = require('../src/config');
const amqp = require('amqplib');
const mattermost = require('../src/services/mattermost');

function run() {
    const onError = require('./onError');
    var q = 'tasks';

    amqp.connect('amqp://'+config.amqpHost+':'+config.amqpPort);
    // Consumer
    amqp.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, async function(msg) {
          if (msg !== null) {
            console.log(msg.content.toString());
            if (void 0 !== config.mattermostWebhookUrl) {
                await mattermost.send({
                    text: msg.content.toString(),
                    channel: '#minecraft',
                    username: 'minecraft'
                });
            }
            ch.ack(msg);
          }
        });
      });
    }).catch(onError);
}

run();
