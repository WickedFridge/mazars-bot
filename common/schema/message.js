/* eslint-disable camelcase,max-lines */
module.exports = {
    $schema: `http://json-schema.org/draft-07/schema#`,
    id: `message`,

    type: `object`,
    additionalProperties: false,

    definitions: {
        conversation: {
            type: `object`,
            additionalProperties: false,
            properties: {
                conversationId: { type: `number` },
                locale: { type: [`string`, `null`] },
                connector: { type: `string` },
                fallbackCount: { type: [`number`, `null`] },
                followup: {
                    type: [`array`, `null`],
                    items: {
                        type: `object`,
                        additionalProperties: false,
                        properties: {
                            inputIntent: { type: `string` },
                            setIntent: { type: `string` },
                            setContext: { type: `object` },
                        },
                        required: [`inputIntent`],
                    },
                },
            },
        },
        lmsResponse: {
            type: `object`,
            additionalProperties: false,
            properties: {
                type: { const: `text` },
                text: { type: `string` },
            },
            required: [`type`, `text`],
        },
        nlu: {
            type: `object`,
            additionalProperties: false,
            properties: {
                originalIntent: { type: `string` },
                intent: { type: `string` },
                entities: { type: 'object' },
                response: { type: 'string' },
                fallback: { type: `boolean` },
            },
        },
        user: {
            type: `object`,
            additionalProperties: false,
            properties: {
                externalId: { type: `string` },
                locale: { type: [`string`, `null`] },
                firstname: { type: [`string`, `null`] },
                lastname: { type: [`string`, `null`] },
            },
        },
    },

    properties: {
        beginTime: { type: `date-time` },
        isError: { type: `boolean` },
        messageId: { type: `string` },
        inputText: { type: `string` },
        conversation: { $ref: `#/definitions/conversation` },
        nlu: { $ref: `#/definitions/nlu` },
        user: { $ref: `#/definitions/user` },
        lmsResponse: { $ref: `#/definitions/lmsResponse` },
        error: { type: 'object' },
    },
    required: ['messageId', 'conversation']
};
