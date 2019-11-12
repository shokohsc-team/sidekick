'use strict';

const config = require('../../src/config');
const rcon = require('rcon-client');

async function sendRconCommand(body) {
    await rcon.connect({
        host: config.rconHost, port: config.rconPort, password: config.rconPassword
    });
    await rcon.send(body);
    rcon.end();
};

module.exports = sendRconCommand;
