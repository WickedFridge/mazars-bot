const config = require('config');
const { createServer } = require('../common/components/serverFactory');
const { saveMessage } = require('./service/saveMessageService');
const { getMessages } = require('./service/getMessages');
const { defaultErrorHandler } = require('../common/components/defaultErrorHandler');

const services = {
    saveMessage: {
        callback: saveMessage,
        errorHandler: defaultErrorHandler,
    },
    getMessages: {
        callback: getMessages,
        errorHandler: defaultErrorHandler,
    },
};

module.exports = createServer(config, services);
