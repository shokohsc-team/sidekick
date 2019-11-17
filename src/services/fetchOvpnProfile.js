'use strict';

const crawler = require('./crawler');
const https = require('https');

async function fetchOvpnProfile(link) {
    return new Promise((resolve, reject) => {
        https.get(link, (res) => {
            res.on('data', (data) => {
                console.log('Serving '+link);
                resolve(data);
            });
        }).on('error', (error) => {
            console.error(error);
        });
    });
};

module.exports = fetchOvpnProfile;
