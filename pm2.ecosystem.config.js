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
            env_production: {
                watch: false,
                NODE_ENV: 'production',
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
            env_production: {
                watch: false,
                NODE_ENV: 'production',
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
            env_production: {
                watch: false,
                NODE_ENV: 'production',
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
            env_production: {
                watch: false,
                NODE_ENV: 'production',
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
            env_production: {
                watch: false,
                NODE_ENV: 'production',
            },
        },
    ],
};
