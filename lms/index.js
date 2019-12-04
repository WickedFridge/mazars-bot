const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('../common/tools/logger');
const { parse } = require('./service/parseEndPoint');

const port = 8080;
const server = 'BBL LMS';

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/lms', (req, res) => {
    logger.info('Lms has been called !');
    parse(req, res);
});

app.listen(port, () => {
    logger.info(`Starting "${server}" listening on port ${port}`);
});
