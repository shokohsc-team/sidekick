'use strict';

async function validate(msg, regexes) {
    return regexes.some(rx => rx.test(msg));
}

async function minecraftLogValidate(message) {
    const regexes = [
        /^\[\d{2}:\d{2}:\d{2}\] \[Server thread\/INFO\]: (?!(.+: (\d+%$|\d+$|\d+\.\d+$|\d+ ms$|\d+ms$|true$|false$)|(.+loading it automatically$)|(.+World Settings For)|(\[dynmap\])|(\[WorldBorder\])|(Loading properties)|(This server is running)|(Console input is disabled)|(Using \d+ threads)|(Debug logging is disabled)|(Default game type)|(Generating keypair)|(Reloading ResourceManager)|(Loaded \d+ recipes)|(Using epoll)|(Preparing start region for dimension)|(Entity \w+ Range)|(\[Rcon)|(Saving chunks)|(ThreadedAnvilChunkStorage)|(Server permissions)|(Starting remote control))).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Server-Worker-\d+\/INFO\]: (?!.+: (\d+%$|\d+$|\d+\.\d+$|\d+ ms$|\d+ms$|true$|false$)).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[Async Chat Thread - #\d+\/INFO\]: (?=\<.+\>).+$/,
        /^\[\d{2}:\d{2}:\d{2}\] \[PrometheusExporter\]: (?!(Disabling|Loading|Enabling|Started)).+$/,
    ];

    return await validate(message, regexes);
};

module.exports = minecraftLogValidate;
