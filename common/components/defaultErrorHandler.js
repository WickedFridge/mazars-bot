const config = require('config');

function defaultErrorHandler(req, res, e) {
    const message = req.body;
    message.isError = true;
    message.error = {
        message: e.message,
        from: config.name,
    };
    res.json(message);
}

module.exports = {
    defaultErrorHandler,
};
