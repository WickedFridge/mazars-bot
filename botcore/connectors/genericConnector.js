const axios = require('axios');
const logger = require('../../common/tools/logger');

async function callAxios({ url, port, endpoint, method, data, headers }) {
    try {
        const response = await axios({
            url: `${url}:${port}${endpoint}`,
            method,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        const { message, config, response } = error;
        const errorModel = {
            message,
        };

        // Add configuration data if exists
        if (config) {
            errorModel.config = {
                method: config.method,
                data: config.data,
                url: config.url,
                headers: config.headers,
            };
        }

        if (response && response.status) {
            const { status } = response;
            errorModel.status = status;
        }

        logger.error(errorModel);
        return errorModel;
    }
}


module.exports = {
    callAxios,
};
