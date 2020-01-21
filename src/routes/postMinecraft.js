'use strict';

const express = require('express');
const sendRconCommand = require('../services/sendRconCommand');
const router = new express.Router();

router.post('/minecraft', async (req, res) => {

    const user = req.body.user_name;
    const triggerWord = req.body.trigger_word;
    const message = req.body.text;
    const command = 'say '+user+': '+ message.replace(new RegExp(triggerWord + ' '), '');
    await sendRconCommand(command);

    res.status(200);
    res.send(req.body);
});

module.exports = router;
