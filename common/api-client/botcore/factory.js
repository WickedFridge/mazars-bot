const BotcoreApiClient = require(`.`);
const BotcoreApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new BotcoreApiClientMock(config)
            : new BotcoreApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
