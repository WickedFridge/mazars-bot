const config = require('config');
const { BotFrameworkAdapter } = require('botbuilder');
const { customLogger, initLogger } = require('../../common/logger');
const { Bot } = require('./bot');

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
const myBot = new Bot();

function connectorMicrosoft(req, res) {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await myBot.run(context);
    });
}

module.exports = {
    connectorMicrosoft,
};
