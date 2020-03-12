const HttpStatus = require('http-status-codes');
const KoaRouter = require('koa-router');
const { gamesRouter } = require('./games');
const { playersRouter } = require('./players');

const router = new KoaRouter();
router.use('/games', gamesRouter.routes(), gamesRouter.allowedMethods());
router.use('/players', playersRouter.routes(), playersRouter.allowedMethods());
router.get('healthCheck', '/health', async (ctx) => {
    ctx.send(HttpStatus.OK);
});

module.exports = {
    router,
};
