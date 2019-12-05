const config = require('config');
const { BotFrameworkAdapter } = require('botbuilder');
const { customLogger, initLogger } = require('../../common/logger');
const { EchoBot } = require('./bot');

initLogger(config);

const logger = customLogger('teamsConnector');

const adapter = new BotFrameworkAdapter({
    appId: config.microsoftApp.id,
    appPassword: config.microsoftApp.password,
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    logger.error(`\n [onTurnError] unhandled error:`);
    logger.error(error);
    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encounted an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create the main dialog.
const myBot = new EchoBot();

function connectorTeams(req, res) {
    logger.info('coucou 0');
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        logger.info('coucou 1');
        await myBot.run(context);
        logger.info('coucou 2');
    });
}

module.exports = {
    connectorTeams,
};
