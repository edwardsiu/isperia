const KoaRouter = require('koa-router');
const handlers = require('./handlers');
const { middleware } = require('../../middlewares');

const gamesRouter = new KoaRouter();

gamesRouter.post('createGame', '/', middleware.authenticate, handlers.createGame);

gamesRouter.post('confirmPlayer', '/:gameId/players/:userId', middleware.authenticate, handlers.confirmPlayer);

module.exports = {
    gamesRouter,
};
