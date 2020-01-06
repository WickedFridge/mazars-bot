const DatabaseApiClient = require(`.`);
const DatabaseApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new DatabaseApiClientMock(config)
            : new DatabaseApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
