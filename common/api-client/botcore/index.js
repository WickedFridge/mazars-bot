const AbstractApiClient = require(`../abstract`);

/**
 * NLU API client
 */
class BotcoreApiClient extends AbstractApiClient {
    constructor({ baseURL }) {
        super({
            baseURL,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    postMessage(data) {
        return this._timeTrackedAxiosCall({
            method: `post`,
            url: `/botcore`,
            data,
            timeTrackerLabel: `botcoreMessage`,
        });
    }
}

module.exports = BotcoreApiClient;
