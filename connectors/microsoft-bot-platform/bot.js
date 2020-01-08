const { ActivityHandler, CardFactory } = require('botbuilder');
const config = require('config');
const moment = require('moment');
const uuid = require('uuid/v4');
const { createClient } = require('../../common/api-client/botcore/factory');
const { customLogger, initLogger } = require('../../common/logger');

initLogger(config);
const logger = customLogger();

const botcoreApiClient = createClient(config.apiClients.botcore);

function createMessage(context) {
    const name = context.activity.from.name || 'UNKNOWN USER';
    const [firstname, lastname] = name.split(' ');
    const intent = context.activity.value && context.activity.value.intent;
    const message = {
        beginTime: moment(context.activity.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        messageId: uuid(),
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
    if (intent) {
        message.nlu = {
            originalIntent: intent,
            intent,
            entities: {},
            response: null,
        };
    }
    return message;
}

function createActivityFromLmsResponse(lmsResponse) {
    switch (lmsResponse.type) {
        case 'text':
            return lmsResponse.text;
        case 'image':
            return {
                text: lmsResponse.text,
                attachments: [{
                    contentType: 'image/*',
                    contentUrl: lmsResponse.value,
                }],
            };
        case 'quickReplies':
            return {
                attachments: [
                    CardFactory.heroCard(
                        lmsResponse.text,
                        CardFactory.images([]),
                        CardFactory.actions(
                            lmsResponse.replies.map(r => ({
                                type: 'messageBack',
                                title: r.text,
                                displayText: r.text,
                                text: r.text,
                                value: JSON.stringify({ intent: r.value }),
                            })),
                        ),
                    ),
                ],
            };
        default:
            logger.error(`unknown type : ${lmsResponse.type} !`);
            return {};
    }
}

class Bot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const message = createMessage(context);
            const response = await botcoreApiClient.postMessage(message);
            const activity = createActivityFromLmsResponse(response.lmsResponse);
            await context.sendActivity(activity);
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
