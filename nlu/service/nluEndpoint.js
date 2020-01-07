const config = require('config');
const dialogflow = require('dialogflow');
const { customLogger, initLogger } = require('../../common/logger');
const { simplifyEntities } = require('./dialogflowEntitiesSimplificator');

initLogger(config);

const logger = customLogger('nlu');

if (!config.dialogflowKeyPath) {
    logger.error('Dialogflow Key not specified ! Check the NLU Readme for more info');
}
// eslint-disable-next-line import/no-dynamic-require
const credentials = require(config.dialogflowKeyPath);
const projectId = credentials.project_id;

function getResponse(text) {
    if (!text) { return null; }
    return {
        type: 'text',
        text,
    };
}

async function nluService(req, res) {
    const message = req.body;
    const sessionId = message.messageId;

    const sessionConfig = {
        projectId,
        credentials,
    };

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(sessionConfig);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message.inputText,
                languageCode: 'fr-FR',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    logger.info('output');
    const result = responses[0].queryResult;
    const intent = result.intent.displayName;
    const entities = simplifyEntities(result.parameters);
    const response = getResponse(result.fulfillmentText);
    message.nlu = {
        originalIntent: intent,
        intent,
        entities,
        response,
    };
    logger.info(message.nlu);
    res.json(message);
}

module.exports = {
    nluService,
};
