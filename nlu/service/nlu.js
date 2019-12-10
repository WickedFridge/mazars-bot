const config = require('config');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const { customLogger, initLogger } = require('../../common/logger');
const { simplifyEntities } = require('./dialogflowEntitiesSimplificator');
const credentials = require('./dialogflow-key-dev-cw');
const projectId = credentials.project_id;

initLogger(config);

const logger = customLogger('nlu');

async function nluService(req, res) {
    const { text } = req.body;
    const sessionId = uuid.v4();

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
                text,
                languageCode: 'fr-FR',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    logger.info('Detected intent');
    const result = responses[0].queryResult;
    const response = result.fulfillmentText;
    const intent = result.intent.displayName;
    const entities = simplifyEntities(result.parameters);

    // logger.debug(result);
    res.json({
        intent,
        entities,
        response,
    });
}

module.exports = {
    nluService,
};
