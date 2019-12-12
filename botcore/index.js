const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { botcoreService } = require('./service/botcoreEndpoint');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    [config.endpoints.botcore]: {
        callback: botcoreService,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
