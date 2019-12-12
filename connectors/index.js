const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { connectorMicrosoft } = require('./microsoft-bot-platform');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    [config.endpoints.microsoft]: {
        callback: connectorMicrosoft,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
