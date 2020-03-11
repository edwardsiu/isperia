const connectors = require('./connectors');

async function fetch(url) {
    const connector = Object.values(connectors).find((c) => c.matches(url));
    return connector.fetch(url);
}

module.exports = {
    fetch,
};
