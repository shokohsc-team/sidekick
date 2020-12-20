'use strict';

const axios = require('axios');

async function fetchOvpnProfile(link) {
    return axios.get(link)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        // console.error(error);
        const date = new Date();

        console.error(`Failed to serve ${link} on ${date.toDateString()} ${date.toTimeString()}`);
    });
};

module.exports = fetchOvpnProfile;
