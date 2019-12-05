const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { configureServer } = require('../common/components/serverFactory');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.teams]: () => {},
    [config.endpoints.skype]: () => {},
};

configureServer(app, config, services);
