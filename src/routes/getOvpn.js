'use strict';

const express = require('express');
const config = require('../../src/config');
const crawlOvpnServer = require('../services/crawlOvpnServer');
const crawlOvpnProfile = require('../services/crawlOvpnProfile');
const fetchOvpnProfile = require('../services/fetchOvpnProfile');
const mattermost = require('../services/mattermost');

const router = new express.Router();

router.get('/ovpn', async (req, res) => {
    const serverLink = await crawlOvpnServer();
    const profileLink = await crawlOvpnProfile(serverLink);
    const profile = await fetchOvpnProfile(profileLink);

    if (void 0 !== config.mattermostWebhookUrl) {
        await mattermost.send({
            text: 'Served '+profileLink,
            channel: '#'+config.mattermostOvpnChannel,
            username: config.mattermostOvpnUser
        });
    }

    console.log('Served '+profileLink);

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(profile);
});

module.exports = router;
