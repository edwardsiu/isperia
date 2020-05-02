const HttpStatus = require('http-status-codes');
const { RequestError } = require('../../modules/errors');
const { Community, Event, EventMember, User } = require('../../modules/models');
const { CommunityController } = require('./controller');

async function createCommunity(ctx) {
    const { name } = ctx.request.body;
    const community = await Community.create({ name });
    ctx.status = HttpStatus.CREATED;
    ctx.body = { communityId: community.id };
}

async function getEvents(ctx) {
    const { communityId } = ctx.params;
    const events = await Event.findAll({
        where: { communityId },
    });
    if (!events || !events.length) {
        ctx.throw(new RequestError(HttpStatus.NOT_FOUND, 'No events found for community'));
    }
    ctx.status = HttpStatus.OK;
    ctx.body = { events: events.map((event) => event.toJSON()) };
}

async function createEvent(ctx) {
    const { communityId } = ctx.params;
    const { name, settings } = ctx.request.body;
    const community = await Community.findByPk(communityId);
    if (!community) {
        ctx.throw(new RequestError(HttpStatus.NOT_FOUND, 'Invalid community id'));
    }
    const event = await Event.create({
        communityId,
        name,
        settings: CommunityController.maskEventSettings(settings),
    });
    ctx.status = HttpStatus.CREATED;
    ctx.body = { eventId: event.id };
}

async function joinCurrentEvent(ctx) {
    const { communityId } = ctx.params;
    const { userId } = ctx.request.body;
    const activeEvent = await CommunityController.getNewestActiveEvent(communityId);
    if (!activeEvent) {
        ctx.throw(new RequestError(HttpStatus.NOT_FOUND, 'No active events for community'));
    }
    const user = await User.findByPk(userId);
    if (!user) {
        ctx.throw(new RequestError(HttpStatus.NOT_FOUND, 'User does not exist'));
    }
    await EventMember.findOrCreate({
        where: {
            userId,
            eventId: activeEvent.id,
        },
    });
    ctx.status = HttpStatus.OK;
    ctx.body = {
        eventName: activeEvent.name,
    };
}

module.exports = {
    createCommunity,
    getEvents,
    createEvent,
    joinCurrentEvent,
};
