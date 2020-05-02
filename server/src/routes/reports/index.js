const KoaRouter = require('koa-router');
// const handlers = require('./handlers');
// const { middleware } = require('../../middlewares');

const reportsRouter = new KoaRouter();

// reportsRouter.use(middleware.authenticate);

module.exports = {
    reportsRouter,
};
