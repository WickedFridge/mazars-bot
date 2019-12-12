const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { lmsService } = require('./service/lmsEndPoint');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    [config.endpoints.lms]: {
        callback: lmsService,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
