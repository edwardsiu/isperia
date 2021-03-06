const axios = require('axios');
const csvtojson = require('csvtojson');
const { URL } = require('url');
const { normalizeCardName } = require('../utils');

function matches(url) {
    const parsed = new URL(url);
    return parsed.hostname === 'tappedout.net';
}

function toObject(obj, card) {
    const normalized = normalizeCardName(card.Name);
    return Object.assign(obj, {
        [normalized]: {
            name: card.Name,
            quantity: Number(card.Qty),
        },
    });
}

async function fetch(url) {
    const response = await axios.request({
        method: 'GET',
        url,
        params: {
            fmt: 'csv',
        },
    });
    const rawDecklistJson = await csvtojson().fromString(response.data);
    const commanders = rawDecklistJson.filter((card) => card.Commander === 'True').reduce(toObject, {});
    if (commanders.length === 0) {
        throw new Error('Not a commander decklist');
    }
    const mainboard = rawDecklistJson.reduce(toObject, {});
    return {
        url,
        commanders,
        mainboard,
        sideboard: {},
    };
}

module.exports = {
    tappedout: {
        fetch,
        matches,
    },
};
