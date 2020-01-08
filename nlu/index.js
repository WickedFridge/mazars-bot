const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { nluService } = require('./service/nluEndpoint');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    nlu: {
        callback: nluService,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
