module.exports = {
    apps: [
        {
            name: 'ice-creamator-botcore',
            script: 'botcore/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'ice-creamator-nlu',
            script: 'nlu/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'ice-creamator-lms',
            script: 'lms/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'ice-creamator-fridge-api',
            script: 'fridge-api/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
    ],
};
