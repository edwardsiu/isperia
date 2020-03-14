const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const KoaRouter = require('koa-router');
const { GameController } = require('./controller');

const gamesRouter = new KoaRouter();

gamesRouter.get('getGamesForHub', '/:hubId', async (ctx) => {
    const { hubId } = ctx.params;
    // TODO: limit the number of games to query
    const games = await ctx.db.Game.findAll({
        where: {
            hub_id: hubId,
        },
    });
    if (!games || !_.isArray(games)) {
        ctx.body = [];
    } else {
        ctx.body = games.map((game) => game.toJSON());
    }
    ctx.status = HttpStatus.OK;
});

gamesRouter.post('addGame', '/', async (ctx) => {
    const { hubId, source } = ctx.request.body;
    const game = await ctx.db.Game.create({
        hub_id: hubId,
        source,
    });
    ctx.status = HttpStatus.OK;
    ctx.body = { gameId: game.id };
});

gamesRouter.post('addPlayer', '/:gameId/players', async (ctx) => {
    const { userId, deckName, deckLink, isWinner, isVerified } = ctx.request.body;
    const game = await GameController.getGame(ctx);
    const user = await ctx.db.User.findByPk(userId);
    if (!user) {
        ctx.throw(HttpStatus.BAD_REQUEST, `User ${userId} does not exist`);
    }
    const player = {
        user_id: userId,
        hub_id: game.hub_id,
        game_id: game.id,
    };
    if (deckName || deckLink) {
        const deck = await GameController.getDeckFromNameOrLink(user, deckName, deckLink);
        Object.assign(player, {
            url: deck.url,
            commanders: deck.commanders,
            decklist: deck.decklist,
        });
    }
    if (_.isBoolean(isWinner)) {
        player.is_winner = isWinner;
    }
    // Cannot be verified without a decklist
    if (_.isBoolean(isVerified) && player.decklist) {
        player.is_verified = isVerified;
    }
    await ctx.db.Player.create(player);
    ctx.status = HttpStatus.OK;
});

gamesRouter.post('updatePlayer', '/:gameId/players/:userId', async (ctx) => {
    const { gameId, userId } = ctx.params;
    const { deckName, deckLink, isWinner, isVerified } = ctx.request.body;
    const player = await ctx.db.Player.findByOne({
        where: {
            game_id: gameId,
            user_id: userId,
        },
    });
    if (!player) {
        ctx.throw(HttpStatus.NOT_FOUND, 'Player does not exist');
    }
    const updates = {};
    if (deckName || deckLink) {
        const user = await ctx.db.User.findByPk(userId);
        const deck = await GameController.getDeckFromNameOrLink(user, deckName, deckLink);
        Object.assign(updates, deck);
    }
    if (_.isBoolean(isWinner)) {
        updates.is_winner = isWinner;
    }
    // Cannot be verified without a decklist
    if (_.isBoolean(isVerified) && (player.decklist || updates.decklist)) {
        updates.is_verified = isVerified;
    }
    Object.assign(player, updates);
    await player.save();
    ctx.status = HttpStatus.OK;
});

module.exports = {
    gamesRouter,
};
