const KoaRouter = require('koa-router');
const { middleware } = require('../../middlewares');
const handlers = require('./handlers');

const communitiesRouter = new KoaRouter();
communitiesRouter.use(middleware.authenticate);
communitiesRouter.post('createCommunity', '/', handlers.createCommunity);

// Event routes
communitiesRouter.get('getEvents', '/:communityId/events', handlers.getEvents);
communitiesRouter.post('createEvent', '/:communityId/events', handlers.createEvent);
communitiesRouter.post('joinCurrentEvent', '/:communityId/events/current', handlers.joinCurrentEvent);

module.exports = {
    communitiesRouter,
};
