const axios = require('axios');
const _ = require('lodash');
const { URL } = require('url');
const xml2js = require('xml2js');
const { normalizeCardName } = require('../utils');

function matches(url) {
    const parsed = new URL(url);
    return (parsed.hostname === 'scryfall.com') && (url.search(/@\w+\/decks\//) > 0);
}

function toObject(obj, card) {
    const normalized = normalizeCardName(card.Name);
    return Object.assign(obj, {
        [normalized]: {
            name: card.Name,
            quantity: Number(card.Quantity),
        },
    });
}

function extractDeckId(url) {
    const result = url.match(/(?<=decks\/)[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/);
    if (!result) {
        throw new Error('Failed to extract deck id; invalid Scryfall url');
    }
    return result[0];
}

async function fetch(url) {
    const deckId = extractDeckId(url);
    const response = await axios.request({
        method: 'GET',
        url: `https://api.scryfall.com/decks/${deckId}/export/dek`,
    });
    const rawDecklist = await xml2js.parseStringPromise(response.data);
    const cards = _.get(rawDecklist, 'Deck.Cards').map((card) => card.$);
    const commanders = cards.filter((card) => card.Sideboard === 'true').reduce(toObject, {});
    if (commanders.length === 0) {
        throw new Error('Not a commander decklist');
    }
    const mainboard = cards.reduce(toObject, {});
    return {
        url,
        commanders,
        mainboard,
        sideboard: {},
    };
}

module.exports = {
    scryfall: {
        fetch,
        matches,
    },
};
