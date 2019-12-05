module.exports = {
    apps: [
        {
            name: 'mazars-botcore',
            cwd: 'botcore',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-nlu',
            cwd: 'nlu',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-lms',
            cwd: 'lms',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'mazars-connectors',
            cwd: 'connectors',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
    ],
};
