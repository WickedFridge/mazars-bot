module.exports = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    id: 'config',

    type: 'object',
    additionalProperties: false,

    definitions: {
        endpoints: {
            type: 'object',
            additionalProperties: false,
            patternProperties: {
                "^.*$": { type: 'string' },
            },
        },
        apiClients: {
            type: 'object',
            additionalProperties: false,
            patternProperties: {
                "^.*$": {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        baseURL: { type: 'string' },
                    }
                },
            },
        },
        firebase: {
            type: 'object',
            additionalProperties: false,
            properties: {
                apiKey: { type: 'string'},
                authDomain: { type: 'string'},
                databaseURL: { type: 'string'},
                projectId: { type: 'string'},
                storageBucket: { type: 'string'},
                messagingSenderId: { type: 'string'},
                appId: { type: 'string'},
            },
        },
        microsoftApp: {
            type: 'object',
            additionalProperties: false,
            properties: {
                id: { type: 'string'},
                password: { type: 'string'},
            },
        },
    },

    properties: {
        name: { type: 'string' },
        endpoints: { $ref: '#/definitions/endpoints' },
        port: { type: 'number' },
        validateInput: { type: 'boolean' },
        apiClients: { $ref: '#/definitions/apiClients' },
        skipsOnError: { type: 'boolean' },
        firebase: { $ref: '#/definitions/firebase'},
        microsoftApp: { $ref: '#/definitions/microsoftApp' },
    },

    required : [
        'name',
        'endpoints',
        'port',
        'validateInput',
        'skipsOnError'
    ],
};
