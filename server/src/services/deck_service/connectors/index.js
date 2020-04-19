// Not supporting archidekt for the time being - the API is too slow
const { archidekt } = require('./archidekt');
const { moxfield } = require('./moxfield');
const { scryfall } = require('./scryfall');
const { tappedout } = require('./tappedout');

module.exports = {
    archidekt,
    moxfield,
    scryfall,
    tappedout,
};
