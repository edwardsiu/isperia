const metadata = require('./metadata');
const connectors = require('./connectors');
const utils = require('./utils');
const logger = require('../../modules/logger');

function findMatchingConnector(url) {
    return Object.values(connectors).find((c) => c.matches(url));
}

function enrichWithMetadata(deck) {
    const archetypes = metadata.classify(deck);
    const fullDeckName = metadata.generateFullDeckName(deck, archetypes);
    return Object.assign(deck, {
        archetypes,
        name: fullDeckName,
    });
}

/**
 * @function fetch
 * @param {String} url Deck host url
 * @returns {Deck}
 */
async function fetch(url) {
    const connector = findMatchingConnector(url);
    if (!connector) {
        throw new Error('Url not supported');
    }
    let deck;
    for (let retry = 0; retry < 3; retry += 1) {
        try {
            deck = await connector.fetch(url);
            break;
        } catch (err) {
            logger.info(`Failed to fetch from ${url}, retrying`);
        }
    }
    if (!deck) {
        logger.error(`Failed to fetch from ${url}, not retrying anymore`);
        return { url };
    }
    return enrichWithMetadata(deck);
}

async function isSupported(url) {
    const connector = Object.values(connectors).find((c) => c.matches(url));
    return connector !== undefined;
}

module.exports = {
    fetch,
    isSupported,
    metadata,
    utils,
};
