const KoaRouter = require('koa-router');
const { players } = require('./players');

const router = new KoaRouter();
router.use('/players', players.routes(), players.allowedMethods());

module.exports = {
    router,
};
