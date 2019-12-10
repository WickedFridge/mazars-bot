/* eslint-disable class-methods-use-this */
const BotcoreApiClient = require(`.`);

/**
 * NLU API client
 */
class BotcoreApiClientMock extends BotcoreApiClient {
    postMessage(data) {
        return Promise.resolve({});
    }
}

module.exports = BotcoreApiClientMock;
