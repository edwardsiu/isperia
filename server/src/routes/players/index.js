const HttpStatus = require('http-status-codes');
const KoaRouter = require('koa-router');
const _ = require('lodash');
// const logger = require('../../modules/logger').named('players');
const { DeckService } = require('../../services/deck_service');

const { collateCards } = require('../../cronjobs/collate_cards');

const playersRouter = new KoaRouter();

playersRouter.post('createPlayer', '/', async (ctx) => {
    const { url } = ctx.request.body;
    const deck = await DeckService.fetch(url);
    await ctx.db.Player.create({
        url,
        commanders: deck.commanders,
        decklist: deck.decklist,
        is_verified: true,
        is_winner: (_.random(1.0, true) <= 0.25),
    });
    ctx.status = HttpStatus.OK;
});

playersRouter.get('runCollate', '/', async (ctx) => {
    await collateCards();
    ctx.status = HttpStatus.OK;
});

module.exports = {
    playersRouter,
};
