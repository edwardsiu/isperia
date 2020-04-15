const KoaRouter = require('koa-router');
const handlers = require('./handlers');

const gamesRouter = new KoaRouter();

gamesRouter.post('createGame', '/', handlers.createGame);

module.exports = {
    gamesRouter,
};
