const config = require('config');

function defaultErrorHandler(req, res, e) {
    const message = req.body;
    message.isError = true;
    message.error = {
        ...e,
        from: config.name,
    };
    res.json(message);
}

module.exports = {
    defaultErrorHandler,
};
