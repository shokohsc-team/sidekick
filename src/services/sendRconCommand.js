'use strict';

const config = require('../../src/config');
const rcon = require('./rcon');

async function sendRconCommand(command) {
    await rcon.connect({
        host: config.rconHost, port: config.rconPort, password: config.rconPassword
    });
    await rcon.send(command);
    await rcon.end();
};

module.exports = sendRconCommand;
