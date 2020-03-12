const axios = require('axios');
const _ = require('lodash');
const { URL } = require('url');
const isValidUUID = require('uuid-validate');
const xml2js = require('xml2js');

function matches(url) {
    const parsed = new URL(url);
    return (parsed.hostname === 'scryfall.com') && (url.search(/@\w+\/decks\//) > 0);
}

function toObject(obj, card) {
    return Object.assign(obj, {
        [card.Name]: Number(card.Quantity),
    });
}

function extractDeckId(url) {
    return _.last(_.trim(url, '/').split('/'));
}

async function fetch(url) {
    const deckId = extractDeckId(url);
    if (!isValidUUID(deckId)) {
        throw new Error(`Not a valid deckId: ${deckId}`);
    }
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
    const decklist = cards.reduce(toObject, {});
    return {
        url,
        commanders,
        decklist,
    };
}

module.exports = {
    scryfall: {
        fetch,
        matches,
    },
};
