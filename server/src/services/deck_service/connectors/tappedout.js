const axios = require('axios');
const csvtojson = require('csvtojson');
const { URL } = require('url');

function matches(url) {
    const parsed = new URL(url);
    return parsed.hostname === 'tappedout.net';
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
    const commanders = rawDecklistJson.filter((card) => card.Commander === 'True')
        .map((commander) => commander.Name);
    if (commanders.length === 0) {
        throw new Error('Not a commander decklist');
    }
    const decklist = rawDecklistJson.reduce((obj, card) => Object.assign(obj, {
        [card.Name]: Number(card.Qty),
    }), {});
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
