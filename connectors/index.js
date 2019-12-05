const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { configureServer } = require('../common/components/serverFactory');
const { connectorTeams } = require('./teams');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.teams]: connectorTeams,
    [config.endpoints.skype]: () => {},
};

configureServer(app, config, services);
