const config = require('config');
const { customLogger, initLogger } = require('../../common/logger');
const { createClient: createNluClient } = require('../../common/api-client/nlu/factory')
const { createClient: createLmsClient } = require('../../common/api-client/lms/factory')

const nluApiClient = createNluClient(config.apiClients.nlu);
const lmsApiClient = createLmsClient(config.apiClients.lms);

initLogger(config);
const logger = customLogger('botcoreService');

async function botcoreService(req, res) {
    const { text } = req.body;
    logger.info(`[input] : ${text}`);

    const nluResponse = await nluApiClient.postAnalyze({ text });
    const lmsResponse = await lmsApiClient.postLMS(nluResponse);

    res.json(lmsResponse);
}

module.exports = {
    botcoreService,
};
