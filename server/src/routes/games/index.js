const KoaRouter = require('koa-router');
const handlers = require('./handlers');

const gamesRouter = new KoaRouter();

gamesRouter.post('createGame', '/', handlers.createGame);

gamesRouter.post('confirmPlayer', '/:gameId/players/:userId', handlers.confirmPlayer);

module.exports = {
    gamesRouter,
};
