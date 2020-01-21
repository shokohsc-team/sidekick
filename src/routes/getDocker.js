'use strict';

const express = require('express');
const config = require('../../src/config');
const fetchDockerTags = require('../services/fetchDockerTags');

const router = new express.Router();

router.get('/docker', async (req, res) => {

    const author = req.query.author;
    const image = req.query.image;
    const domain = void 0 === req.query.domain ? config.dockerPublicRegistry : req.query.domain;
    const limit = void 0 === req.query.limit ? 2 : req.query.limit;
    const registryUrl = 'https://' + domain + '/repositories/' + author + '/' + image + '/tags/';
    let tags = [];

    const init = await fetchDockerTags(registryUrl);
    init.results.forEach((tag) => {
        tags.push(tag);
    });
    if (10 < init.count) {
        const pages = Math.ceil(parseInt(init.count) / 10);
        let requests = [];
        for (let page = 2; page <= pages; page++) {
            requests.push(fetchDockerTags(registryUrl + '?page=' + page));
        }
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
            response.results.forEach((tag) => {
                tags.push(tag);
            });
        });
    }

    tags = tags.sort((a, b) => {
        return (new Date(a.last_updated)).getTime() > (new Date(b.last_updated)).getTime() ? -1 : 1;
    })
    .map((tag) => {
        return tag.name;
    })
    // .filter(tag => 'latest' !== tag)
    .slice(0, limit);

    res.status(200);
    res.send({
        'tags': tags
    });
});

module.exports = router;
