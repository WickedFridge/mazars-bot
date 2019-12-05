const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { nluService } = require('./service/nlu');
const { configureServer } = require('../common/components/serverFactory');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.nlu]: nluService,
};

configureServer(app, config, services);
