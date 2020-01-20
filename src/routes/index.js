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
 *  getGit:
 *    type: object
 *    properties:
 *      branches:
 *        $ref: "#/definitions/arrayOfBranches"
 *      releases:
 *        $ref: "#/definitions/arrayOfReleases"
 *  getDocker:
 *    type: object
 *    properties:
 *      tags:
 *        $ref: "#/definitions/arrayOfTags"
 *  arrayOfReleases:
 *    type: array
 *    items:
 *      $ref: "#/definitions/release"
 *  release:
 *    type: string
 *    description: Release name
 *    example: v0.0.1
 *  arrayOfBranches:
 *    type: array
 *    items:
 *      $ref: "#/definitions/branch"
 *  branch:
 *    type: string
 *    description: Branch name
 *    example: master
 *  arrayOfTags:
 *    type: array
 *    items:
 *      $ref: "#/definitions/tag"
 *  tag:
 *    type: string
 *    description: Tag name
 *    example: v0.0.1
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

/**
 * @swagger
 * /docker:
 *  get:
 *    tags:
 *      - GetDocker
 *    description: Returns docker registry branches & releases
 *    parameters:
 *    - name: author
 *      in: query
 *      required: true
 *      type: string
 *      description: The docker image author
 *    - name: image
 *      in: query
 *      required: true
 *      type: string
 *      description: The docker image name
 *    - name: domain
 *      in: query
 *      required: false
 *      schema:
 *         type: string
 *         default: registry.hub.docker.com/v2
 *      description: The docker registry domain
 *    - name: limit
 *      in: query
 *      required: false
 *      schema:
 *         type: integer
 *         minimum: 0
 *         default: 2
 *      description: The docker registry image tag limit
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: The docker registry branches & releases
 *        schema:
 *          $ref: "#/definitions/getDocker"
 *      404:
 *        description: registry url not found
 *
 */

router.use(require('./getDocker'));

/**
 * @swagger
 * /git:
 *  get:
 *    tags:
 *      - GetGit
 *    description: Returns git repository branches & releases
 *    parameters:
 *    - name: author
 *      in: query
 *      required: true
 *      type: string
 *      description: The git repository author
 *    - name: repository
 *      in: query
 *      required: true
 *      type: string
 *      description: The git repository name
 *    - name: domain
 *      in: query
 *      required: false
 *      schema:
 *         type: string
 *         default: github.com
 *      description: The git server domain
 *    - name: limit
 *      in: query
 *      required: false
 *      schema:
 *         type: integer
 *         minimum: 0
 *         default: 2
 *      description: The git server repository release limit
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: The git repository branches & releases
 *        schema:
 *          $ref: "#/definitions/getGit"
 *      404:
 *        description: repository url not found
 *
 */

router.use(require('./getGit'));

module.exports = router;
