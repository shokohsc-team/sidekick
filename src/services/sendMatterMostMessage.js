'use strict';

const config = require('../../src/config');
const mattermost = require('./mattermost');
const minecraftLogValidate = require('./minecraftLogValidate');

async function sendMatterMostMessage(msg) {
    const isValid = await minecraftLogValidate(msg);
    if (void 0 !== config.mattermostWebhookUrl && isValid) {
        // Server thread/INFO: Group `time` Group `type` Group `message`
        const regex = /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[(Server\ thread|Async\ Chat\ Thread\ -\ \#\d+)\/INFO\]):\ (?<message>.+)$/g;
        const { groups: { message } } = regex.exec(msg);
        await mattermost.send({
            text: message,
            channel: '#minecraft',
            username: 'minecraft'
        });
    }
};

module.exports = sendMatterMostMessage;
