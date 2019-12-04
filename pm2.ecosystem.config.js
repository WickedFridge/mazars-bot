module.exports = {
    apps: [
        {
            name: 'mazars-botcore',
            script: 'botcore/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-nlu',
            script: 'nlu/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-lms',
            script: 'lms/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-connectors',
            script: 'connectors/index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
    ],
};
