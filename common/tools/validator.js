const { validate } = require(`jsonschema`);
const { customLogger } = require(`../logger`);
const logger = customLogger(`MessageValidation`);

const schemas = {
    message: require(`../schema/message`),
    config: require('../schema/config'),
};

function validateObject (object, type) {
    if (!Object.keys(schemas).includes(type)) {
        logger.error(`unknown type : ${type}`);
        logger.error(`known types are : ${Object.keys(schemas).join(', ')}`);
        return false;
    }
    const validationResult = validate(object, schemas[type]);

    if (validationResult.errors.length === 0) {
        return true;
    }

    logger.error(`Unable to validate ${type}`);
    logger.error(object);
    logger.error(validationResult.errors);

    return false;
}

module.exports = {
    validate: validateObject,
};
