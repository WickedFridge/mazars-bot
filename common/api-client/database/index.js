const AbstractApiClient = require(`../abstract`);

/**
 * NLU API client
 */
class DatabaseApiClient extends AbstractApiClient {
    constructor({ baseURL }) {
        super({
            baseURL,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    saveMessage(data) {
        return this._timeTrackedAxiosCall({
            method: `post`,
            url: `/saveMessage`,
            data,
            timeTrackerLabel: `saveMessage`,
        });
    }
}

module.exports = DatabaseApiClient;
