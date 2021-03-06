const axios = require('axios');
const { URL } = require('url');
const { normalizeCardName } = require('../utils');

function matches(url) {
    const parsed = new URL(url);
    return (parsed.hostname === 'archidekt.com') && (url.search(/\/decks\/\d+/) > 0);
}

function toObject(obj, card) {
    const cardName = card.card.oracleCard.name;
    const normalized = normalizeCardName(cardName);
    return Object.assign(obj, {
        [normalized]: {
            name: cardName,
            quantity: Number(card.quantity),
        },
    });
}

function extractDeckId(url) {
    const result = url.match(/(?<=decks\/)\d+/);
    if (!result) {
        throw new Error('Failed to extract deck id; invalid Archidekt url');
    }
    return result[0];
}

async function fetch(url) {
    const deckId = extractDeckId(url);
    const response = await axios.request({
        method: 'GET',
        url: `https://archidekt.com/api/decks/${deckId}/`,
    });
    const { cards } = response.data;
    const commanders = cards.filter((card) => card.category === 'Commander').reduce(toObject, {});
    if (commanders.length === 0) {
        throw new Error('Not a commander decklist');
    }
    const mainboard = cards.filter((card) => card.category !== 'Maybeboard').reduce(toObject, {});
    return {
        url,
        commanders,
        mainboard,
        sideboard: {},
    };
}

module.exports = {
    archidekt: {
        fetch,
        matches,
    },
};
