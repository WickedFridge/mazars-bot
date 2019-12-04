const logger = require('../../common/tools/logger');
const { callNlu } = require('../connectors/nluConnector');
const { callLms } = require('../connectors/lmsConnector');
const { callFridgeApi } = require('../connectors/fridgeApiConnector');

async function botcoreService(req, res) {
    const { text } = req.body;
    logger.info(`[input] : ${text}`);

    const { intent, entities } = await callNlu(text);
    logger.info('[nluResult] :');
    logger.info(JSON.stringify({ intent, entities }, null, 2));

    if (intent === 'iceCream') {
        const available = await callFridgeApi(entities);
        console.log(available);
    }

    const result = await callLms(intent, entities);
    logger.info('[lmsResult] :', result);

    res.json(result);
}

module.exports = {
    botcoreService,
};
