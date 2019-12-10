const NluApiClient = require(`.`);
const NluApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new NluApiClientMock(config)
            : new NluApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
