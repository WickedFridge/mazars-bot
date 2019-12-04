const { lms } = require('../config/default');
const { callAxios } = require('./genericConnector');

async function callLms(intent, entities){
    const { url, port, endpoint } = lms;
    return callAxios({
        url,
        port,
        endpoint,
        method: 'post',
        data: { intent, entities }
    });
}

module.exports = {
    callLms,
};
