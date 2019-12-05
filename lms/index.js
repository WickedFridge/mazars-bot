const config = require('config');
const app = require('express')();
const bodyParser = require('body-parser');

const { parse } = require('./service/parseEndPoint');
const { configureServer } = require('../common/components/serverFactory');

app.use(bodyParser.json({ limit: '50mb' }));

const services = {
    [config.endpoints.lms]: parse,
};

configureServer(app, config, services);
