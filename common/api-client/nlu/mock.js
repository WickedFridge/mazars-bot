/* eslint-disable class-methods-use-this */
const NluApiClient = require(`.`);

/**
 * NLU API client
 */
class NluApiClientMock extends NluApiClient {
    postMessage(data) {
        return Promise.resolve({});
    }
}

module.exports = NluApiClientMock;
