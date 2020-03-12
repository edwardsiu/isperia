const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const KoaRouter = require('koa-router');

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

module.exports = {
    gamesRouter,
};
