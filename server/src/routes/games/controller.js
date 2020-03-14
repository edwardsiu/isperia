const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const { DeckService } = require('../../services');

async function getGame(ctx) {
    const { gameId } = ctx.params;
    const game = await ctx.db.Game.findByPk(gameId);
    if (!game) {
        ctx.throw(HttpStatus.NOT_FOUND);
    }
    return game;
}

async function getDeckFromNameOrLink(user, deckName, deckLink) {
    let url = deckLink;
    if (deckName && _.has(user.saved_decks, deckName)) {
        url = _.get(user.saved_decks, deckName);
    }
    if (!url) {
        throw new Error('No deckName or deckLink specified');
    }
    return DeckService.fetch(url);
}

module.exports = {
    GameController: {
        getGame,
        getDeckFromNameOrLink,
    },
};
