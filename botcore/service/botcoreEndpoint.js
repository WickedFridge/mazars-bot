const config = require('config');
const { customLogger, initLogger } = require('../../common/logger');
const { createClient: createNluClient } = require('../../common/api-client/nlu/factory')
const { createClient: createLmsClient } = require('../../common/api-client/lms/factory')
const { createClient: createDatabaseClient } = require('../../common/api-client/database/factory');

const nluApiClient = createNluClient(config.apiClients.nlu);
const lmsApiClient = createLmsClient(config.apiClients.lms);
const databaseApiClient = createDatabaseClient(config.apiClients.database);

initLogger(config);

async function botcoreEndpoint(req, res) {
    const message = req.body;
    const messageWithNlu = await nluApiClient.postAnalyze(message);
    const messageWithLms = await lmsApiClient.postLMS(messageWithNlu);
    if (messageWithLms.isError && !messageWithLms.lmsResponse) {
        messageWithLms.lmsResponse = 'Erreur interne (LMS)';
    }
    await databaseApiClient.saveMessage(messageWithLms);
    await res.json(messageWithLms);
}

module.exports = {
    botcoreService: botcoreEndpoint,
};
