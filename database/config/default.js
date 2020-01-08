module.exports = {
    name: 'database',
    endpoints: {
        saveMessage: {
            path: '/saveMessage',
            method: 'post',
            validateInput: true,
            skipsOnError: true,
        },
        getMessages: {
            path: '/getMessages',
            method: 'get',
            validateInput: false,
            skipsOnError: true,
        },
    },
    port: 8005,
    database: {
        host: 'localhost',
        user: 'root',
        password: 'mazars',
        database: 'bot',
        multipleStatements: true,
        charset: 'utf8mb4_general_ci',
    },
};
