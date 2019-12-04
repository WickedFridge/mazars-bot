const { nlu } = require('../config/default');
const { callAxios } = require('./genericConnector');

async function callNlu(text){
    const { url, port, endpoint } = nlu;
    return callAxios({
        url,
        port,
        endpoint,
        method: 'post',
        data: {text}
    });
}

module.exports = {
    callNlu,
};
