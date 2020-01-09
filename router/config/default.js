module.exports = {
    name: 'router',
    endpoints: {
        microsoft: {
            path: '/api/messages/microsoft-bot-platform',
            method: 'post',
            validateInput: false,
            skipsOnError: false,
        },
        getMessages: {
            path: '/api/database/messages',
            method: 'get',
            validateInput: false,
            skipsOnError: true,
        },
    },
    port: 80,
    apiClients: {
        botcore: {
            baseURL: 'http://localhost:8002',
        },
        database: {
            baseURL: 'http://localhost:8005',
        },
    },
    microsoftApp: {
        id: '785b2fde-652c-4786-98b2-292831dd6921',
        password: 'EzRnpAZ-(zNPUml0%:/*ie;12',
    },
};
