const { fridgeApi } = require('../config/default');
const { callAxios } = require('./genericConnector');

async function callFridgeApi(entities){
    const { flavour } = entities;
    const { url, port, endpoint } = fridgeApi;
    return callAxios({
        url,
        port,
        endpoint: `${endpoint}/${flavour}`,
        method: 'get',
    });
}

module.exports = {
    callFridgeApi,
};
