const logger = require('../../common/tools/logger');
const { getDeepValue } = require('../../common/tools/objectHelper');
const { lms, fallback } = require('../database/lmsDatabase');

function parse(req, res) {
    const { intent, entities } = req.body;
    logger.info(`intent: ${intent}`);
    const output = getOutputText(intent, entities);
    logger.info(`output: ${output}`);
    res.json({ output });
}

function getOutputText(intent, entities) {
    let output = 'default text';
    const resultsMatchingIntent = lms.filter(elem => elem.intent === intent);
    const sortedResults = getSortedResults(resultsMatchingIntent, entities);
    logger.info(`results matching intent : ${JSON.stringify(sortedResults, null, 2)}`);
    if (sortedResults.length > 0) {
        output = sortedResults[0].output;
    } else {
        const index = Math.round(Math.random() * fallback.length);
        output = fallback[index];
    }
    return output;
}

function getEntitiesScore(lmsEntities, reqEntities) {
    if (!lmsEntities) return 0;
    let score = 0;
    logger.info('');
    logger.info('lms : ', lmsEntities);
    logger.info('req : ', reqEntities);
    for (const entity in reqEntities) {
        if (lmsEntities[entity]) {
            if (lmsEntities[entity] === '*') {
                score += 1;
                logger.info('partial match');
            } else if (Array.isArray(lmsEntities[entity]) && Array.isArray(reqEntities[entity])) {
                reqEntities[entity].forEach((ent) => {
                    if (lmsEntities[entity].includes(ent)) {
                        score += 2;
                        logger.info('full match');
                    }
                });
            }
        }
    }
    for (const entity in lmsEntities) {
        if (!reqEntities[entity].length) {
            logger.warn(`${lmsEntities}, ${lmsEntities[entity]}`);
            score -= 1;
        }
    }
    return score;
}

function getSortedResults(array, entities) {
    return array.map((e) => {
        e.match = getEntitiesScore(e.entities, entities);
        return e;
    }).sort((e1, e2) => e1.match < e2.match);
}

module.exports = {
    parse,
    getOutputText,
};
