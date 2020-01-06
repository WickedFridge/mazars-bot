const config = require('config');
const firebase = require('firebase');
const { customLogger, initLogger } = require('../../common/logger');

initLogger(config);
const logger = customLogger(config.name);

let lms = null;
let database = null;

if (config.firebase && config.firebase.apiKey) {
    firebase.initializeApp(config.firebase);
    database = firebase.database();
}

async function initLms() {
    if (lms) { return; }
    if (database) {
        lms = await database.ref('/').once('value').then(snapshot => snapshot.val());
        database.ref('/').on('value', (snapshot) => { lms = snapshot.val(); });
    } else {
        // eslint-disable-next-line global-require
        lms = require('../database/lmsDatabase');
    }
    logger.debug(lms);
}

function getEntitiesScore(lmsEntities, reqEntities) {
    if (!lmsEntities) return 0;
    let score = 0;
    logger.info('lms : ');
    logger.info(lmsEntities);
    logger.info('req : ');
    logger.info(reqEntities);
    Object.entries(reqEntities).forEach(([entity, value]) => {
        if (lmsEntities[entity] === value) {
            score += 1;
        }
    });
    return score;
}

function getSortedResults(array, entities) {
    return array.map((e) => {
        e.match = e.entities ? getEntitiesScore(e.entities, entities) : 0.5;
        return e;
    }).sort((e1, e2) => e2.match - e1.match);
}

function getOutputText(intent, entities) {
    let output = 'default text';
    const resultsMatchingIntent = lms[intent] || lms.DEFAULT_FALLBACK;
    const sortedResults = getSortedResults(resultsMatchingIntent, entities);
    logger.info(`results matching intent : ${JSON.stringify(sortedResults, null, 2)}`);
    if (sortedResults.length > 0) {
        output = sortedResults[0].value;
    } else {
        output = database.DEFAULT_FALLBACK.value;
    }

    return output;
}

async function lmsService(req, res) {
    await initLms();
    const message = req.body;
    if (message.isError) {
        if (message.nlu) {
            message.nlu.intent = 'CORE_ERROR';
        } else {
            message.nlu = {
                intent: 'CORE_ERROR',
                originalIntent: 'UNKONWN',
                entities: {},
            };
        }
    }
    const { intent, entities, response } = message.nlu;
    logger.info(`intent: ${intent}`);
    message.lmsResponse = response || getOutputText(intent, entities);
    logger.info('output:');
    logger.info(message.lmsResponse);
    await res.json(message);
}

module.exports = {
    lmsService,
};
