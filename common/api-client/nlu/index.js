const AbstractApiClient = require(`../abstract`);

/**
 * NLU API client
 */
class NluApiClient extends AbstractApiClient {
    constructor({ baseURL }) {
        super({
            baseURL,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    postAnalyze(data) {
        return this._timeTrackedAxiosCall({
            method: `post`,
            url: `/nlu`,
            data,
            timeTrackerLabel: `nluAnalyze`,
        });
    }
}

module.exports = NluApiClient;
