const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { saveMessage } = require('./service/saveMessage');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    [config.endpoints.saveMessage]: {
        callback: saveMessage,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
