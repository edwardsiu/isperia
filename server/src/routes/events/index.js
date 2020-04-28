const KoaRouter = require('koa-router');
const handlers = require('./handlers');

const eventsRouter = new KoaRouter();

eventsRouter.get('getTopPlayers', '/:eventId/players', handlers.getTopPlayers);

module.exports = {
    eventsRouter,
};
