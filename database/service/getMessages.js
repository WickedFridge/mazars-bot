const squel = require('squel');
const config = require('config');
const database = require('../connector');
const { initLogger, customLogger } = require('../../common/logger');

initLogger(config);

const logger = customLogger('getMessages');

async function getMessages(req, res) {
    const query = squel.select({ replaceSingleQuotes: true })
        .from('message')
        .field('userid')
        .field('firstname')
        .field('lastname')
        .field('input')
        .field('output')
        .field('date')
        .order('userid', false)
        .order('date')
        .toString();
    const result = await database.asyncQuery(query);
    const temp = {};
    result.forEach(({ userid, ...data }) => {
        if (!temp[userid]) {
            temp[userid] = [];
        }
        temp[userid].push(data);
    });
    const output = Object.values(temp);
    logger.info(output);
    await res.json(output);
}

module.exports = {
    getMessages,
};
