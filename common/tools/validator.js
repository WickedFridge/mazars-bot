const { validate } = require(`jsonschema`);
const schema = require(`../message-scheme`);
const { customLogger } = require(`../logger`);
const logger = customLogger(`MessageValidation`);

function validateMessage(message) {
    const validationResult = validate(message, schema);

    if (validationResult.errors.length === 0) {
        return true;
    }

    logger.error(`Unable to validate message`);
    logger.error(message);
    logger.error(validationResult.errors);

    return false;
}

module.exports = {
    validateMessage,
};
