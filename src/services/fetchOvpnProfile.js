'use strict';

const config = require('../../src/config');
const axios = require('axios');

async function fetchOvpnProfile(link) {
    return axios.get(config.freeopenvpnUrl + '/' + link)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        // console.error(error);
        const date = new Date();

        console.error(`Failed to serve ${link.replace(/\/pservers\/(.+)\/(.+)/ig, '$2')} on ${date.toDateString()} ${date.toTimeString()}`);
    });
};

module.exports = fetchOvpnProfile;
