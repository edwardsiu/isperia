const HttpStatus = require('http-status-codes');
const KoaRouter = require('koa-router');
// const logger = require('../../modules/logger').named('players');
const { DeckService } = require('../../services/deck_service');

const players = new KoaRouter();

players.post('createPlayer', '/', async (ctx) => {
    const { url } = ctx.request.body;
    const deck = await DeckService.fetch(url);
    await ctx.db.Player.create({
        url,
        commander: deck.commanders,
        decklist: deck.decklist,
    });
    ctx.status = HttpStatus.OK;
});

module.exports = {
    players,
};
