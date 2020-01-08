const squel = require('squel');
const database = require('../connector');

async function saveMessage(req, res) {
    const message = req.body;
    const values = {
        id: message.messageId,
        date: message.beginTime,
        firstname: message.user.firstname,
        lastname: message.user.lastname,
        input: message.inputText,
        output: message.lmsResponse.text,
    };
    const query = squel.insert({ replaceSingleQuotes: true })
        .into('message')
        .setFields(values)
        .toString();
    await database.asyncQuery(query);
    await res.json(message);
}

module.exports = {
    saveMessage,
};
