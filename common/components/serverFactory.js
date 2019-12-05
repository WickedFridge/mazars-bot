const { customLogger, initLogger } = require('../logger');

function configureServer(app, config, services) {
    initLogger(config);
    const logger = customLogger(config.name);

    Object.entries(services).forEach(([endpoint, callback]) => {
        app.post(endpoint, (req, res) => {
            logger.debug(`[${config.name}] ${endpoint} called with parameters`);
            logger.debug(req.body);
            callback(req, res);
        });
    });

    app.listen(config.port, () => {
        logger.info(`Starting "${config.name}" listening on port ${config.port}`);
    });
}

module.exports = {
    configureServer,
};