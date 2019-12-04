const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('../common/tools/logger');

const port = 80;
const server = 'Mazars connectors';

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/connectors/teams', (req, res) => {
    logger.info('Botcore has been called !');
    // connectorTeams(req, res);
});

app.post('/connectors/skype', (req, res) => {
    logger.info('Botcore has been called !');
    // connectorSkype(req, res);
});

app.listen(port, () => {
    logger.info(`Starting "${server}" listening on port ${port}`);
});
