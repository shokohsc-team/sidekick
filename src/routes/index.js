'use strict';

const express = require('express');

const router = new express.Router();

/**
 * @swagger
 * definitions:
 *  apiInfo:
 *    properties:
 *      title:
 *        type: string
 *        description: The title of the API
 *      environment:
 *        type: string
 *        description: The environment
 *      version:
 *        type: string
 *        description: The version of the API
 *      commit:
 *        type: string
 *        description: The commit hash
 */

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - GetRoot
 *    description: Returns information about the API
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: The API information
 *        schema:
 *          $ref: '#/definitions/apiInfo'
 *
 */

router.use(require('./getRoot'));

/**
 * @swagger
 * /ovpn:
 *  get:
 *    tags:
 *      - GetOvpn
 *    description: Returns text ovpn profile
 *    produces:
 *      - text/plain
 *    responses:
 *      200:
 *        description: The Ovpn profile
 *
 */

router.use(require('./getOvpn'));
/**
 * @swagger
 * /minecraft:
 *  post:
 *    tags:
 *      - PostMinecraft
 *    description: Execute RCON command to minecraft server
 *    consumes:
 *      - application/json
 *    parameters:
 *    - name: data
 *      in: Body
 *      required: true
 *      type: object
 *      description: Mattermost outgoing webhook data
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success
 *
 */

router.use(require('./postMinecraft'));

module.exports = router;
