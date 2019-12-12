const config = require('config');
const { customLogger, initLogger } = require('../../common/logger');
const { createClient: createNluClient } = require('../../common/api-client/nlu/factory')
const { createClient: createLmsClient } = require('../../common/api-client/lms/factory')

const nluApiClient = createNluClient(config.apiClients.nlu);
const lmsApiClient = createLmsClient(config.apiClients.lms);

initLogger(config);

async function botcoreEndpoint(req, res) {
    const message = req.body;
    const messageWithNlu = await nluApiClient.postAnalyze(message);
    const messageWithLms = await lmsApiClient.postLMS(messageWithNlu);
    if (message.isError) {
        message.lmsResponse = {
            type: 'text',
            value: 'Internal Error',
        };
    }
    res.json(messageWithLms);
}

module.exports = {
    botcoreService: botcoreEndpoint,
};