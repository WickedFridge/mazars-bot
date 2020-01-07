module.exports = {
    name: 'botcore',
    endpoints: {
        botcore: '/botcore',
    },
    port: 8002,
    validateInput: true,
    apiClients: {
        nlu: {
            baseURL: 'http://localhost:8003',
        },
        lms: {
            baseURL: 'http://localhost:8004',
        },
        database: {
            baseURL: 'http://localhost:8005',
        },
    },
    skipsOnError: false,
};
