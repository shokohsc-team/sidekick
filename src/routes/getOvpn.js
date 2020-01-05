'use strict';

const express = require('express');
const config = require('../../src/config');
const crawlOvpnServer = require('../services/crawlOvpnServer');
const crawlOvpnProfile = require('../services/crawlOvpnProfile');
const fetchOvpnProfile = require('../services/fetchOvpnProfile');
const mattermost = require('../services/mattermost');

const router = new express.Router();

router.get('/ovpn', async (request, response) => {
    const serverLink = await crawlOvpnServer();
    const profileLink = await crawlOvpnProfile(serverLink);
    const profile = await fetchOvpnProfile(profileLink);

    if (void 0 !== config.mattermostWebhookUrl) {
        await mattermost.send({
            text: 'Served '+profileLink,
            channel: config.mattermostOvpnChannel,
            username: 'sidekick'
        });
    }

    response.status(200);
    response.set('Content-Type', 'text/plain');
    response.send(profile);
});

module.exports = router;
