const { customLogger, initLogger } = require('../logger');
const { validateMessage } = require('../tools/validator');

function configureServer(app, config, services) {
    initLogger(config);
    const logger = customLogger(config.name);

    Object.entries(services).forEach(([endpoint, callback]) => {
        app.post(endpoint, (req, res) => {
            const message = req.body;
            logger.debug(`[${config.name}] ${endpoint} called with parameters`);
            logger.debug(message);
            if (!config.validateInput || validateMessage(message)) {
                callback(req, res);
            } else {
                logger.error(`Message doesn't comply with schema`);
                res.json(message)
            }
        });
    });

    if (process.env.NODE_ENV !== `test`) {
        app.listen(config.port, () => {
            logger.info(`Starting "${config.name}" listening on port ${config.port}`);
        });
    }
}

module.exports = {
    configureServer,
};
