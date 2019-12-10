const AbstractApiClient = require(`../abstract`);

/**
 * NLU API client
 */
class LmsApiClient extends AbstractApiClient {
    constructor({ baseURL }) {
        super({
            baseURL,
            baseHeaders: {
                'Content-Type': `application/json; charset=utf-8`,
            },
        });
    }

    postLMS(data) {
        return this._timeTrackedAxiosCall({
            method: `post`,
            url: `/lms`,
            data,
            timeTrackerLabel: `postLMS`,
        });
    }
}

module.exports = LmsApiClient;
