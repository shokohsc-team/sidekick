'use strict';

const config = require('../../src/config');
const mattermost = require('./mattermost');
const minecraftLogValidate = require('./minecraftLogValidate');

async function sendMatterMostMessage(msg) {
    const isValid = await minecraftLogValidate(msg);
    if (void 0 !== config.mattermostWebhookUrl && isValid) {
        let match = /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>.+)$/.exec(msg);
        console.log(match);
        // console.log(match.groups.message);
        // await mattermost.send({
        //     text: message,
        //     channel: '#minecraft',
        //     username: 'minecraft'
        // });
    }
};

module.exports = sendMatterMostMessage;
