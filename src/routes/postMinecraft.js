'use strict';

const express = require('express');
const sendRconCommand = require('../services/sendRconCommand');

const router = new express.Router();

router.post('/minecraft', async (request, response) => {

    const user = request.body.user_name;
    const triggerWord = request.body.trigger_word;
    const message = request.body.text;
    const command = 'say '+user +': '+ message.replace(new RegExp(triggerWord + ' '), '');
    await sendRconCommand(command);

    response.status(200);
    response.send(request.body);
});

module.exports = router;
