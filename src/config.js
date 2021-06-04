'use strict';

const cfg = require('12factor-config');

const config = cfg({
  allowedHeaders: {
    env: 'ALLOWED_HEADERS',
    type: 'string',
  },
  allowedOrigins: {
    env: 'ALLOWED_ORIGINS',
    type: 'string',
  },
  appName: {
    env: 'APP_NAME',
    type: 'string',
    required: true,
    default: 'app',
  },
  debug: {
    env: 'DEBUG',
    type: 'string',
    required: true,
    default: 'true',
  },
  desiredPort: {
    env: 'PORT',
    type: 'integer',
    required: true,
    default: 3000,
  },
  enableCORS: {
    env: 'ENABLE_CORS',
    type: 'boolean',
  },
  nodeEnv: {
    env: 'NODE_ENV',
    type: 'enum',
    values: ['development', 'production'],
    default: 'production',
  },
  rconHost: {
      env: 'RCON_HOST',
      type: 'string',
      required: true,
      default: 'minecraft',
  },
  rconPort: {
      env: 'RCON_PORT',
      type: 'integer',
      required: true,
      default: 25565,
  },
  rconPassword: {
      env: 'RCON_PASSWORD',
      type: 'string',
      required: true,
      default: 'minecraft',
  },
  amqpHost: {
      env: 'AMQP_HOST',
      type: 'string',
      required: true,
      default: 'rabbitmq',
  },
  amqpPort: {
      env: 'AMQP_PORT',
      type: 'integer',
      required: true,
      default: 5672,
  },
  mattermostWebhookUrl: {
      env: 'MATTERMOST_WEBHOOK_URL',
  },
  freeopenvpnUrl: {
      env: 'FREEOPENVPN_URL',
      type: 'string',
      required: true,
      default: 'https://www.freeopenvpn.org',
  },
  allowedCountriesServers: {
      env: 'ALLOWED_COUNTRIES_SERVERS',
      type: 'string',
      required: false,
      default: '*',
      // '*', 'russia', 'usa', 'japan', 'korea', 'thailand' are valid choices for now
  },
  openvpnProfileProtocol: {
      env: 'OPENVPN_PROFILE_PROTOCOL',
      type: 'string',
      required: false,
      default: '*',
      // '*', 'udp', 'tcp' are valid choices
  },
  mattermostOvpnChannel: {
      env: 'MATTERMOST_OVPN_CHAN',
      type: 'string',
      required: true,
      default: 'vpn-client',
      type: 'string',
  },
  mattermostMinecraftChannel: {
      env: 'MATTERMOST_MINECRAFT_CHAN',
      type: 'string',
      required: true,
      default: 'minecraft',
  },
  mattermostMinecraftUser: {
      env: 'MATTERMOST_MINECRAFT_USER',
      type: 'string',
      required: true,
      default: 'sidekick',
  },
  mattermostOvpnUser: {
      env: 'MATTERMOST_OVPN_USER',
      type: 'string',
      required: true,
      default: 'sidekick',
  }
});

module.exports = config;
