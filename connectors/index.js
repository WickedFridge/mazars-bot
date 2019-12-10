const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { configureServer } = require('../common/components/serverFactory');
const { connectorMicrosoft } = require('./microsoft-bot-platform');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.microsoft]: connectorMicrosoft,
};

configureServer(app, config, services);
