'use strict';

const axios = require('axios');

async function fetchOvpnProfile(link) {
    return axios.get(link)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        // console.error(error);
        console.error('Failed to serve '+link);
    });
};

module.exports = fetchOvpnProfile;
