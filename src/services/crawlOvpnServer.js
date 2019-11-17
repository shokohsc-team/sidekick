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

                    $(body).find('div a div.button:contains("Download")').each(function(){
                        links.push($(this).parent().attr('href'));
                    });
                    const index = Math.floor(Math.random() * Math.floor(links.length - 1));
                    resolve(links[index]);
                }
                done();
            }
        }]);
    });
};

module.exports = crawlOvpnServer;
