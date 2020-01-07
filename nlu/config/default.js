module.exports = {
    name: 'nlu',
    endpoints: {
        nlu: '/nlu',
    },
    port: 8003,
    dialogflowKeyPath: './dialogflow-key-dev-cw',
    validateInput: true,
    skipsOnError: true,
};
