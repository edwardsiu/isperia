const connectors = require('./connectors');

function findMatchingConnector(url) {
    return Object.values(connectors).find((c) => c.matches(url));
}

async function fetch(url) {
    const connector = findMatchingConnector(url);
    if (!connector) {
        throw new Error('Url not supported');
    }
    return connector.fetch(url);
}

async function isSupported(url) {
    const connector = Object.values(connectors).find((c) => c.matches(url));
    return connector !== undefined;
}

module.exports = {
    fetch,
    isSupported,
};
