const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { botcoreService } = require('./service/botcoreService');
const { configureServer } = require('../common/components/serverFactory');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.botcore]: botcoreService,
};

configureServer(app, config, services);
