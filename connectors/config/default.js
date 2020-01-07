module.exports = {
    name: 'connectors',
    endpoints: {
        microsoft: '/microsoft-bot-platform',
    },
    port: 80,
    apiClients: {
        botcore: {
            baseURL: 'http://localhost:8002',
        },
    },
    microsoftApp: {
        id: '785b2fde-652c-4786-98b2-292831dd6921',
        password: 'EzRnpAZ-(zNPUml0%:/*ie;12',
    },
    validateInput: false,
    skipsOnError: false,
};
