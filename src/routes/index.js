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
 *  tag:
 *    type: string
 *    description: Tag name
 *    example: v0.0.1
 *  arrayOfTags:
 *    type: array
 *    items:
 *      $ref: "#/definitions/tag"
 *  getDocker:
 *    type: object
 *    properties:
 *      tags:
 *        $ref: "#/definitions/arrayOfTags"
 *  branch:
 *    type: string
 *    description: Branch name
 *    example: my-branch
 *  arrayOfBranches:
 *    type: array
 *    items:
 *      $ref: "#/definitions/branch"
 *  release:
 *    type: string
 *    description: Release name
 *    example: v0.0.1
 *  arrayOfReleases:
 *    type: array
 *    items:
 *      $ref: "#/definitions/release"
 *  getGit:
 *    type: object
 *    properties:
 *      branches:
 *        $ref: "#/definitions/arrayOfBranches"
 *      releases:
 *        $ref: "#/definitions/arrayOfReleases"
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
 *    description: Execute RCON command to minecraft server (forces 'say' command)
 *    consumes:
 *      - application/json
 *    parameters:
 *    - name: token
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook token
 *    - name: team_id
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook team_id
 *    - name: team_domain
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook team_domain
 *    - name: channel_id
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook channel_id
 *    - name: team_name
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook team_name
 *    - name: user_id
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook user_id
 *    - name: user_name
 *      in: Body
 *      required: true
 *      type: string
 *      description: Mattermost outgoing webhook user_name
 *    - name: post_id
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook post_id
 *    - name: text
 *      in: Body
 *      required: true
 *      type: string
 *      description: Mattermost outgoing webhook text
 *    - name: trigger_word
 *      in: Body
 *      required: true
 *      type: string
 *      description: Mattermost outgoing webhook trigger_word
 *    - name: file_ids
 *      in: Body
 *      required: false
 *      type: string
 *      description: Mattermost outgoing webhook file_ids
 *    - name: timestamp
 *      in: Body
 *      required: false
 *      type: integer
 *      description: Mattermost outgoing webhook timestamp
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Success
 *
 */

router.use(require('./postMinecraft'));

module.exports = router;
