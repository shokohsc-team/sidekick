'use strict';

const config = require('../../src/config');

async function sendRconCommand(command) {
    const rcon = await require('./rcon').connect({
        host: config.rconHost, port: config.rconPort, password: config.rconPassword
    });

    await rcon.send(command);
    await rcon.end();
};

module.exports = sendRconCommand;
