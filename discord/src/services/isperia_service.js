const axios = require('axios').default;
const config = require('config');
const _ = require('lodash');
const moment = require('moment');
const logger = require('../modules/logger').named('IsperiaService');
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

/**
 * 
 * @param {Object} requestConfig 
 */
async function request(requestConfig) {
    if (tokenExpired()) {
        await authenticate();
    }
    _.set(
        requestConfig,
        'headers.Authorization',
        `${CACHE.credentials.tokenType} ${CACHE.credentials.token}`,
    );
    requestConfig.url = urlJoin(config.get('isperia.api_url'), requestConfig.url);
    return axios(requestConfig);
}

function logRequestError(err) {
    logger.warn(`${err.config.method} ${err.config.url} [${err.response.status}]: ${JSON.stringify(err.response.data)}`);
}

async function createUser(name) {
    try {
        const { data } = await request({
            url: '/users',
            method: 'POST',
            data: {
                name,
            },
        });
        return { userId: data.userId };
    } catch(err) {
        logRequestError(err);
    }
}

async function createCommunity(name) {
    try {
        const { data } = await request({
            url: '/communities',
            method: 'POST',
            data: {
                name,
            },
        });
        return { communityId: data.communityId };
    } catch(err) {
        logRequestError(err);
    }
}

/**
 * Registers the user to the current active event for community
 *
 * @param {String} userId 
 * @param {String} communityId 
 * @returns {Promise<Object>} If registration was successful, the event info object
 */
async function registerToCurrentCommunityEvent(userId, communityId) {
    try {
        const { data } = await request({
            url: `/communities/${communityId}/events/current`,
            method: 'POST',
            data: {
                userId,
            },
        });
        return { eventName: data.eventName };
    } catch(err) {
        logRequestError(err);
    }
}

module.exports = {
    authenticate,
    request,
    createUser,
    createCommunity,
    registerToCurrentCommunityEvent,
};
