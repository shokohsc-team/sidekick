'use strict';

const Crawler = require('crawler');
const crawler = new Crawler({ maxConnections: 5 });

module.exports = crawler;
