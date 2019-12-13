/* eslint-disable class-methods-use-this */
const DatabaseApiClient = require(`.`);

/**
 * NLU API client
 */
class DatabaseApiClientMock extends DatabaseApiClient {
    saveMessage(data) {
        return Promise.resolve({});
    }
}

module.exports = DatabaseApiClientMock;
