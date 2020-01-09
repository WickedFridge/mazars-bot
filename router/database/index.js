const config = require('config');
const { createClient } = require('../../common/api-client/database/factory');

const databaseApiClient = createClient(config.apiClients.database);

async function getMessages(req, res) {
    const messages = await databaseApiClient.getMessages();
    res.json(messages);
}

module.exports = {
    getMessages,
};
