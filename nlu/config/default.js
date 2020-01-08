module.exports = {
    name: 'nlu',
    endpoints: {
        nlu: {
            path: '/nlu',
            method: 'post',
            validateInput: true,
            skipsOnError: true,
        },
    },
    port: 8003,
    dialogflowKeyPath: './dialogflow-key-dev-cw',
};
