module.exports = {
    name: 'botcore',
    endpoints: {
        botcore: '/botcore',
    },
    port: 8082,
    apiClients: {
        lms: {
            baseURL: 'http://localhost:8080',
        },
        nlu: {
            baseURL: 'http://localhost:8081',
        },
    },
};
