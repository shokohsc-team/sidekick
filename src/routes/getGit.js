'use strict';

const express = require('express');
const config = require('../../src/config');
const fetchGitReleases = require('../services/fetchGitReleases');
const fetchGitBranches = require('../services/fetchGitBranches');

const router = new express.Router();

router.get('/git/:repositoryUrl', async (request, response) => {

    const repositoryUrl = request.params.repositoryUrl;
    const tagRegex = /(.+)refs\/tags\/(?<tag>.+$)/;
    let tags = [];
    let releases = await fetchGitReleases(repositoryUrl);
    releases = releases.split('\n');
    releases.forEach(element => {
        const result = tagRegex.exec(element);
        if (result && result.groups && result.groups.tag) {
            tags.push(result.groups.tag);
        }
    });

    const headRegex = /(.+)refs\/heads\/(?<head>.+$)/;
    let heads = [];
    let branches = await fetchGitBranches(repositoryUrl);
    branches = branches.split('\n');
    branches.forEach(element => {
        const result = headRegex.exec(element);
        if (result && result.groups && result.groups.head) {
            heads.push(result.groups.head);
        }
    });

    response.status(200);
    response.send({
        'branches': heads,
        'releases': tags
    });
});

module.exports = router;
