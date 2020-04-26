const HttpStatus = require('http-status-codes');
const KoaRouter = require('koa-router');
const { communitiesRouter } = require('./communities');
const { gamesRouter } = require('./games');
const { usersRouter } = require('./users');

const router = new KoaRouter();
router.use('/communities', communitiesRouter.routes(), communitiesRouter.allowedMethods());
router.use('/games', gamesRouter.routes(), gamesRouter.allowedMethods());
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
router.get('healthCheck', '/health', async (ctx) => {
    ctx.send(HttpStatus.OK);
});

module.exports = {
    router,
};
