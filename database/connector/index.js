const config = require(`config`);
const { customLogger } = require(`../../common/logger`);
const mysql = require(`mysql`);

const logger = customLogger(`dbConnector`);
let client = mysql.createPool(config.database);

function reconnect() {
    // if (client) client.destroy();
    logger.info(`DATABASE: New connection tentative`);
    client = mysql.createPool(config.database);
    client.getConnection(err => {
        if (err) {
            logger.error(err);
            logger.debug(`Try to connect in 500ms...`);
            setTimeout(() => reconnect(), 500);
        } else {
            logger.info(`DATABASE: New connection established with database :)`);
        }
    });
}

// Etablish new connection
client.getConnection(err => {
    if (err) {
        logger.error(`ERROR DATABASE: cannot etablish a connection with database :( !`);
        reconnect();
    } else {
        logger.info(`DATABASE: New connection etablished :)`);
    }
});

client.on(`error`, err => {
    logger.error(`ERROR DATABASE: `);
    logger.error(err);

    // - The server close the connection.
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
        logger.error(`/!\\ Cannot establish a connection with the database. /!\\ (${err.code})`);
        reconnect();
    }
    // - Connection in closing
    else if (err.code === `PROTOCOL_ENQUEUE_AFTER_QUIT`) {
        logger.error(`/!\\ Cannot establish a connection with the database. /!\\ (${err.code})`);
        reconnect();
    }
    // - Fatal error : connection variable must be recreated
    else if (err.code === `PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR`) {
        logger.error(`/!\\ Cannot establish a connection with the database. /!\\ (${err.code})`);
        reconnect();
    }
    // - Error because a connection is already being established
    else if (err.code === `PROTOCOL_ENQUEUE_HANDSHAKE_TWICE`) {
        logger.error(`/!\\ Cannot establish a connection with the database. /!\\ (${err.code})`);
    }
    // - Anything else
    else {
        logger.error(`/!\\ Cannot establish a connection with the database. /!\\ (${err.code})`);
        reconnect();
    }
});

client.asyncQuery = (query) => {
    return new Promise((resolve, reject) => {
        client.query(query, (err, result) => {
            if (err) {
                logger.error(`error when executing query :`);
                logger.error(query);
                logger.error(err.message);

                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = client;
