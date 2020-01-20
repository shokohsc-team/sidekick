'use strict';

const axios = require('axios');

async function fetchDockerTags(registryUrl) {
    return axios.get(registryUrl)
    .then(function (response) {
        return response.data ? response.data : {};
    })
    .catch(function (error) {
        console.log('=========== ERROR ==========\n', error);
        return [];
    });
};

module.exports = fetchDockerTags;
