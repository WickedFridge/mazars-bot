const config = require('config');
const { customLogger, initLogger } = require('../../common/logger');
const { callNlu } = require('../connectors/nluConnector');
const { callLms } = require('../connectors/lmsConnector');

initLogger(config);
const logger = customLogger('botcoreService');

async function botcoreService(req, res) {
    const { text } = req.body;
    logger.info(`[input] : ${text}`);

    const { intent, entities } = await callNlu(text);
    logger.info('[nluResult] :');
    logger.info({ intent, entities });

    const result = await callLms(intent, entities);
    logger.info('[lmsResult] :', result);
    logger.info(result);

    res.json(result);
}

module.exports = {
    botcoreService,
};
