const axios = require('axios');
const { URL } = require('url');

function matches(url) {
    const parsed = new URL(url);
    return (parsed.hostname === 'moxfield.com') && (url.search(/\/decks\/[\w\d]+/) > 0);
}

function toObject(obj, entry) {
    const [name, body] = entry;
    return Object.assign(obj, {
        [name]: {
            quantity: Number(body.quantity),
        },
    });
}

function extractDeckId(url) {
    const result = url.match(/(?<=decks\/)[\w\d]+/);
    if (!result) {
        throw new Error('Failed to extract deck id; invalid Moxfield url');
    }
    return result[0];
}

async function fetch(url) {
    const deckId = extractDeckId(url);
    const response = await axios.request({
        method: 'GET',
        url: `https://api.moxfield.com/v1/decks/all/${deckId}`,
    });
    const { commander, partner, mainboard } = response.data;
    const commanders = {};
    if (!commander) {
        throw new Error('Not a commander decklist');
    }
    commanders[commander.name] = { quantity: 1 };
    if (partner) {
        commanders[partner.name] = { quantity: 1 };
    }
    const decklist = Object.entries(mainboard).reduce(toObject, {});
    return {
        url,
        commanders,
        decklist,
    };
}

module.exports = {
    moxfield: {
        fetch,
        matches,
    },
};
