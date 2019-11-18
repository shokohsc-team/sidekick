'use strict';

async function validate(msg, regexes) {
    let flag = true
    regexes.forEach(regex => {
        if (regex.test(msg)) {
            flag = false;
        }
    });

    return flag;
}

async function minecraftLogValidate(message) {
    const regexes = [
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=.+: (\d+%$|\d+$|\d+\.\d+$|\d+ ms$|\d+ms$|true$|false$)).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=.+loading it automatically$).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=.+World Settings For).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=\[dynmap\]).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Loading properties).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=This server is running).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Console input is disabled).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Using \d+ threads).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Debug logging is disabled).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Default game type).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Generating keypair).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Reloading ResourceManager).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Loaded \d+ recipes).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Using epoll).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Preparing start region for dimension).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Entity \w+ Range).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=\[Rcon:).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Saving chunks).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=ThreadedAnvilChunkStorage).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Server permissions).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?=Starting remote control).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Async Chat Thread - #\d+\/INFO\]: (?!\<.+\>).+$/,
    ];

    return await validate(message, regexes);
};

module.exports = minecraftLogValidate;
