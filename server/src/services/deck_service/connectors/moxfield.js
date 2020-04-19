const axios = require('axios');
const { URL } = require('url');
const { normalizeCardName } = require('../utils');

function matches(url) {
    const parsed = new URL(url);
    return (parsed.hostname === 'www.moxfield.com') && (url.search(/\/decks\/[\w\d]+/) > 0);
}

function toObject(obj, entry) {
    const [name, body] = entry;
    const normalized = normalizeCardName(name);
    return Object.assign(obj, {
        [normalized]: {
            name,
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
    const { commander, partner, mainboard, sideboard } = response.data;
    const commanders = {};
    if (!commander) {
        throw new Error('Not a commander decklist');
    }
    commanders[commander.name] = { quantity: 1 };
    if (partner) {
        commanders[partner.name] = { quantity: 1 };
    }
    const parsedMainboard = Object.entries(mainboard).reduce(toObject, {});
    const parsedSideboard = Object.entries(sideboard).reduce(toObject, {});
    return {
        url,
        commanders,
        mainboard: parsedMainboard,
        sideboard: parsedSideboard,
    };
}

module.exports = {
    moxfield: {
        fetch,
        matches,
    },
};
