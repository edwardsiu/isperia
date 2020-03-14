const axios = require('axios');
const csvtojson = require('csvtojson');
const { URL } = require('url');

function matches(url) {
    const parsed = new URL(url);
    return parsed.hostname === 'tappedout.net';
}

function toObject(obj, card) {
    return Object.assign(obj, {
        [card.Name]: { quantity: Number(card.Qty) },
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
    const decklist = rawDecklistJson.reduce(toObject, {});
    return {
        url,
        commanders,
        decklist,
    };
}

module.exports = {
    tappedout: {
        fetch,
        matches,
    },
};
