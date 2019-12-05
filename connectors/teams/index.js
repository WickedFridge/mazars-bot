const config = require('config');
const { customLogger, initLogger } = require('../../common/logger');

initLogger(config);
const logger = customLogger('teamsConnector');

function connectorTeams(req, res) {
    try {
        // const message = createMessage(req);
        // const output = botcoreApiClient.call(message);
        // res.json(output);
    } catch (e) {
        logger.error(e);
        res.json({});
    }
}

module.exports = {
    connectorTeams,
};