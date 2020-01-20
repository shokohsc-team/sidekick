'use strict';

const express = require('express');
const config = require('../../src/config');
const fetchDockerTags = require('../services/fetchDockerTags');

const router = new express.Router();

router.get('/docker', async (request, response) => {


    const author = request.query.author;
    const image = request.query.image;
    const domain = void 0 === request.query.domain ? 'registry.hub.docker.com/v2' : request.query.domain;
    const limit = void 0 === request.query.limit ? 2 : request.query.limit;
    const registryUrl = 'https://' + domain + '/repositories/' + author + '/' + image + '/tags/';

    let tags = [];
    let res = {};
    let page = 1;
    while ((res = await fetchDockerTags(registryUrl + '?page=' + page)) && (res.next && res.results && null !== res.next)) {
        res.results.forEach((tag) => {
            tags.push(tag);
        });
        page++;
    }

    tags = tags.sort((a, b) => {
        return (new Date(a.last_updated)).getTime() > (new Date(b.last_updated)).getTime() ? -1 : 1;
    })
    .map((tag) => {
        return tag.name;
    })
    .filter(tag => 'latest' !== tag)
    .slice(0, limit);

    response.status(200);
    response.send({
        'tags': tags
    });
});

module.exports = router;
