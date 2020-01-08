const squel = require('squel');
const config = require('config');
const database = require('../connector');
const { initLogger, customLogger } = require('../../common/logger');

initLogger(config);

const logger = customLogger('getMessages');

async function getMessages(req, res) {
    const query = squel.select({ replaceSingleQuotes: true })
        .from('message')
        .field('firstname')
        .field('lastname')
        .field('input')
        .field('output')
        .field('date')
        .order('date', false)
        .toString();
    const result = await database.asyncQuery(query);
    logger.info(result);
    await res.json(result);
}

module.exports = {
    getMessages,
};
