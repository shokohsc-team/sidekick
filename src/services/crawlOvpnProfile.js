'use strict';

const config = require('../../src/config');
const crawler = require('./crawler');

async function crawlOvpnProfile(link) {
    return new Promise((resolve, reject) => {
        crawler.queue([{
            uri: config.freeopenvpnUrl + '/' + link,
            jQuery: true,
            callback: function (error, data, done) {
                const $ = data.$;
                if(error){
                    console.log(error);
                    throw error;
                }else{
                    const body = data.body;
                    const regex = /._udp\.ovpn/g;
                    let links = [];

                    $(body).find('div p a').each(function(){
                        const match = $(this).attr('href').match(regex);
                        if (null !== match && 0 < match.length) {
                            links.push($(this).attr('href'));
                        }
                    });
                    const index = Math.floor(Math.random() * Math.floor(links.length - 1));
                    resolve(links[index]);
                }
                done();
            }
        }]);
    });
};

module.exports = crawlOvpnProfile;
