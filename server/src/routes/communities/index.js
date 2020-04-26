const KoaRouter = require('koa-router');
const { middleware } = require('../../middlewares');
const handlers = require('./handlers');

const communitiesRouter = new KoaRouter();

communitiesRouter.post('createCommunity', '/', middleware.authenticate, handlers.createCommunity);

communitiesRouter.get('getEvents', '/:communityId/events', handlers.getEvents);
communitiesRouter.post('createEvent', '/:communityId/events/', middleware.authenticate, handlers.createEvent);

module.exports = {
    communitiesRouter,
};
