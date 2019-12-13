module.exports = {
    apps: [
        {
            name: 'botcore',
            cwd: 'botcore',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'nlu',
            cwd: 'nlu',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'lms',
            cwd: 'lms',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'connectors',
            cwd: 'connectors',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
        {
            name: 'db',
            cwd: 'database',
            script: 'index.js',
            NODE_TLS_REJECT_UNAUTHORIZED: '0',
            env: {
                watch: true,
                NODE_ENV: 'local',
            },
        },
    ],
};
