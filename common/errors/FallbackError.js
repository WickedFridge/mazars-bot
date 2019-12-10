/* eslint-disable semi */
const AbstractError = require(`./AbstractError`);

class FallbackError extends AbstractError {
    constructor(message) {
        super(message || `Fallback error`, 204);
    }
}

module.exports = FallbackError;
