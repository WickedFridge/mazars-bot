const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { connectorMicrosoft } = require('./microsoft-bot-platform');
const { getMessages } = require('./database');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    microsoft: {
        callback: connectorMicrosoft,
        errorHandler: defaultErrorHandler,
    },
    getMessages: {
        callback: getMessages,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
