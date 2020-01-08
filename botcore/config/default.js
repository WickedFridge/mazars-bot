module.exports = {
    name: 'botcore',
    endpoints: {
        botcore: {
            path: '/botcore',
            method: 'post',
            validateInput: true,
            skipsOnError: false,
        },
    },
    port: 8002,
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
};
