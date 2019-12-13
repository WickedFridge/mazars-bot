const bodyParser = require('body-parser');
const express = require('express');
const { customLogger, initLogger } = require('../logger');
const { validate } = require('../tools/validator');

function createServer(config, services) {
    initLogger(config);
    const logger = customLogger(config.name);

    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));

    // config is a complex object and we just want the keys and values
    if (!validate(JSON.parse(JSON.stringify(config)), 'config')) {
        logger.error(`Can't validate your component's config ! Change it to match the schema or change the schema at common/schema/config`);
        return app;
    }

    Object.entries(services).forEach(([endpoint, { callback, errorHandler }]) => {
        if (!errorHandler) {
            logger.error(`On error callback is not defined for the endpoint ${endpoint} ! Please set it up in your index.js file`);
        }

        app.post(endpoint, async (req, res) => {
            const message = req.body;
            logger.debug(`[${config.name}] ${endpoint} called with parameters`);
            logger.debug(message);

            if (message.isError && config.skipsOnError) {
                logger.error(`message is skipped because ${config.name} skips on error`);
                res.json(message);
                return;
            }

            if (config.validateInput && !validate(message, 'message')) {
                logger.error(`Message doesn't comply with schema`);
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
