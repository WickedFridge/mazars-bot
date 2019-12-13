const { ActivityHandler } = require('botbuilder');
const config = require('config');
const moment = require('moment');
const { createClient } = require('../../common/api-client/botcore/factory');

const botcoreApiClient = createClient(config.apiClients.botcore);

function createMessage(context) {
    const [firstname, lastname] = context.activity.from.name.split(' ');
    return {
        beginTime: moment(context.activity.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        messageId: context.activity.id,
        inputText: context.activity.text,
        conversation: {
            locale: context.activity.locale,
            connector: context.activity.channelId,
        },
        user: {
            externalId: context.activity.from.id,
            locale: context.activity.locale,
            firstname,
            lastname,
        },
    };
}

class Bot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const message = createMessage(context);
            const response = await botcoreApiClient.postMessage(message);
            await context.sendActivity(response.lmsResponse.text);
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
