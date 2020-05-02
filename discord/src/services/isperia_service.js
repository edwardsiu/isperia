const axios = require('axios').default;
const config = require('config');
const _ = require('lodash');
const moment = require('moment');
const { urlJoin } = require('../modules/utils');

const CACHE = {};

async function authenticate() {
    const response = await axios({
        method: 'post',
        url: config.get('isperia.auth_url'),
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            client_id: config.get('isperia.client_id'),
            client_secret: config.get('isperia.client_secret'),
            grant_type: 'client_credentials',
            audience: config.get('isperia.audience'),
        },
    });
    CACHE.credentials = {
        token: response.data.access_token,
        tokenType: response.data.token_type,
        expires: moment().add(response.data.expires_in, 'seconds'),
    }
}

function tokenExpired() {
    return (!_.has(CACHE, 'credentials.expires') || _.get(CACHE, 'credentials.expires') <= moment());
}

async function request(requestConfig) {
    if (tokenExpired()) {
        await authenticate();
    }
    _.set(
        requestConfig,
        'headers.Authentication',
        `${CACHE.credentials.tokenType} ${CACHE.credentials.token}`,
    );
    requestConfig.url = urlJoin(config.get('isperia.api_url'), requestConfig.url);
    const response = await axios(requestConfig);
    return response.data;
}

async function createUser(name) {
    const { userId } = await request({
        url: '/users',
        method: 'POST',
        data: {
            name,
        },
    });
    return { userId };
}

module.exports = {
    authenticate,
    request,
    createUser,
};
