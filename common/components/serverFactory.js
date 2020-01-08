const bodyParser = require('body-parser');
const express = require('express');
const { customLogger, initLogger } = require('../logger');
const { validate } = require('../tools/validator');

function findMissingEndpoint(endpoints, services) {
    return Object.keys(endpoints).find(endpoint => !services[endpoint]);
}

function findMissingService(endpoints, services) {
    return Object.keys(services).find(service => !endpoints[service]);
}

function createServer(config, services) {
    initLogger(config);
    const logger = customLogger(config.name);

    logger.info(config);
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));

    logger.info('coucou');

    // config is a complex object and we just want the keys and values
    if (!validate(JSON.parse(JSON.stringify(config)), 'config')) {
        logger.error(`Can't validate your component's config ! Change it to match the schema or change the schema at common/schema/config`);
        return app;
    }

    const missingEndpoint = findMissingEndpoint(config.endpoints, services);
    if (missingEndpoint) {
        logger.error(`Endpoint ${missingEndpoint} doesn't have a service associated`);
        return app;
    }

    const missingService = findMissingService(config.endpoints, services);
    if (missingService) {
        logger.error(`Service ${missingService} isn't associated to an endpoint`);
        return app;
    }

    Object.entries(services).forEach(([service, { callback, errorHandler }]) => {
        const { path, method, validateInput, skipsOnError } = config.endpoints[service];
        logger.info(`setting up endpoint ${service} at path ${path}`);

        if (!errorHandler) {
            logger.error(`On error callback is not defined for the endpoint ${path} ! Please set it up in your index.js file`);
        }

        app[method](path, async (req, res) => {
            const message = req.body;
            logger.debug(`[${config.name}] endpoint ${service} (${path}) called with parameters`);
            logger.debug(message);

            if (message.isError && skipsOnError) {
                logger.error(`message is skipped because ${service} skips on error`);
                res.json(message);
                return;
            }

            if (validateInput && !validate(message, 'message')) {
                logger.error(`Message doesn't comply with schema`);
                logger.error(`Please check your code or update the schema in /common/schema/message`);
                message.isError = true;
                res.json(message);
                return;
            }
            try {
                await callback(req, res);
            } catch (e) {
                logger.error('error catched');
                logger.error(e);
                errorHandler(req, res, e);
            }
        });
    });

    if (process.env.NODE_ENV !== `test`) {
        app.listen(config.port, () => {
            logger.info(`Starting "${config.name}" listening on port ${config.port}`);
        });
    }
    return app;
}

module.exports = {
    createServer,
};
