const LmsApiClient = require(`.`);
const LmsApiClientMock = require(`./mock`);

const clients = {};

function createClient(config) {
    const key = JSON.stringify(config);
    if (!clients[key]) {
        clients[key] = config.mock === true
            ? new LmsApiClientMock(config)
            : new LmsApiClient(config);
    }
    return clients[key];
}

module.exports = { createClient };
