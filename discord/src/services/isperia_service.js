const axios = require('axios').default;
const config = require('config');
const _ = require('lodash');
const moment = require('moment');

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
    const response = await axios(requestConfig);
    return response.data;
}

module.exports = {
    authenticate,
    request,
};
