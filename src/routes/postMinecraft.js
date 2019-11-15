'use strict';

const express = require('express');
// const sendRconCommand = require('../services/sendRconCommand');

const router = new express.Router();

router.post('/minecraft', async (request, response) => {

    const data = request.body;
    console.log(data);
    // await sendRconCommand(data);
    response.status(200);
    response.send(request.body);
});

module.exports = router;
