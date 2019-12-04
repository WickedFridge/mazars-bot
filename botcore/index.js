const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('../common/tools/logger');
const { botcoreService } = require('./service/botcoreService');

const port = 8082;
const server = 'BBL Botcore';

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/botcore', (req, res) => {
    logger.info('Botcore has been called !');
    botcoreService(req, res);
});

app.listen(port, () => {
    logger.info(`Starting "${server}" listening on port ${port}`);
});
