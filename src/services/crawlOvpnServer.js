'use strict';

const config = require('../../src/config');
const crawler = require('./crawler');

async function crawlOvpnServer() {
    return new Promise((resolve, reject) => {
        crawler.queue([{
            uri: config.freeopenvpnUrl,
            jQuery: true,
            callback: function (error, data, done) {
                const $ = data.$;
                if(error){
                    console.log(error);
                    throw error;
                }else{
                    const body = data.body;
                    let links = [];

                    // $(body).find('div a div.button:contains("Download")').each(function(){
                    $(body).find('center div div div a div.button:contains("Download")').each(function(){
                        const href = $(this).parent().attr('href');
                        // const country = href.replace(/^cf\//, '').replace(/\.php$/, '');
                        const country = href.replace(/^private\.php\?cntid=$/, '');
                        if('*' === config.allowedCountriesServers || 0 <= config.allowedCountriesServers.toLowerCase().search(new RegExp(`${country.toLowerCase()}`, 'g')))
                          links.push(href);
                    });
                    const index = Math.floor(Math.random() * Math.floor(links.length));
                    resolve(links[index]);
                }
                done();
            }
        }]);
    });
};

module.exports = crawlOvpnServer;
