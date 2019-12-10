/* eslint-disable class-methods-use-this */
const LmsApiClient = require(`.`);

/**
 * NLU API client
 */
class LmsApiClientMock extends LmsApiClient {
    postMessage(data) {
        return Promise.resolve({});
    }
}

module.exports = LmsApiClientMock;
