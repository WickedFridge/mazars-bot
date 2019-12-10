const { ActivityHandler } = require('botbuilder');
const config = require('config');
const { createClient } = require('../../common/api-client/botcore/factory');

const botcoreApiClient = createClient(config.apiClients.botcore);

function createMessage(context) {
    return {
        locale: context.activity.locale,
        text: context.activity.text,
    };
}

class Bot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const message = createMessage(context);
            const response = await botcoreApiClient.postMessage(message);
            // await context.sendActivity(`You said '${context.activity.text}' and response is ${response.output}`);
            await context.sendActivity(response.output);
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const { membersAdded } = context.activity;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Bonjour et bienvenue!');
                }
            }
            await next();
        });
    }
}

module.exports.Bot = Bot;
