const fs = require('fs');
const config = require('config');
const { initLogger, customLogger } = require('../../common/logger');

initLogger(config);

const database = require('../connector');

const logger = customLogger('execSQL');
const sqlFilePath = process.argv[2] || './scripts/database/schema.sql';

// Extract SQL queries from files. Assumes no ';' in the fileNames
const queries = fs.readFileSync(`${sqlFilePath}`).toString()
    .replace(/#.*?(\r\n|\n|\r)/g, '') // remove comment lines
    .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
    .replace(/\s+/g, ' '); // excess white space

logger.debug(queries);

database.query(queries, (err, result) => {
    if (err) { throw err; }
    logger.info(`File SQL ${[...sqlFilePath.split('/')].pop()} executed successfully`);
    database.end();
});
