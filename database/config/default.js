module.exports = {
    name: 'database',
    endpoints: {
        saveMessage: '/saveMessage',
    },
    port: 8083,
    validateInput: true,
    skipsOnError: true,
    database: {
        host: 'localhost',
        user: 'root',
        password: 'mazars',
        database: 'bot',
        multipleStatements: true,
        charset: `utf8mb4_general_ci`,
    },
}
