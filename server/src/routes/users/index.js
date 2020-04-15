const KoaRouter = require('koa-router');
const handlers = require('./handlers');

const usersRouter = new KoaRouter();

usersRouter.post('createUser', '/', handlers.createUser);

module.exports = {
    usersRouter,
};
