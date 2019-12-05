module.exports = {
    name: 'botcore',
    endpoints: {
        botcore: '/botcore',
    },
    port: 8082,
    lms: {
        url: 'http://localhost',
        port: '8080',
        endpoint: '/lms',
    },
    nlu: {
        url: 'http://localhost',
        port: '8081',
        endpoint: '/nlu',
    },
    fridgeApi: {
        url: 'http://localhost',
        port: '8083',
        endpoint: '/flavour',
    },
};
