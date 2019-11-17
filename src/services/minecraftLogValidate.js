'use strict';

async function validate(msg, regexes) {
    let pass = true;
    regexes.forEach(regex => {
        if (false === pass || -1 !== msg.search(regex)) {
            pass = false;
        }
    });
    return pass;
}

async function minecraftLogValidate(message) {
    // Server thread/INFO: Group `time` Group `type` Group `message`
    const regexes = [
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!.+:\ (\d+%$|\d+$|\d+\.\d+|\d+\ ms|true$|false$)).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!\[dynmap\]).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Loading\ properties).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!This\ server\ is\ running).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Console\ input\ is\ disabled).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Using\ \d+\ threads).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Debug\ logging\ is\ disabled).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Default\ game\ type).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Generating\ keypair).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Reloading\ ResourceManager).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Loaded\ \d+\ recipes).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Using\ epoll).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Preparing\ start\ region\ for\ dimension).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!Entity\ \w+\ Range).+)$/g,
        /^(?<time>\[\d{2}:\d{2}:\d{2}\])\ (?<type>\[Server thread\/INFO\]):\ (?<message>(?!.+World\ Settings\ For).+)$/g,
    ];

    return await validate(message, regexes);
};

module.exports = minecraftLogValidate;
