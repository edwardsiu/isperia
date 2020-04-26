const HttpStatus = require('http-status-codes');
const { RequestError } = require('../../modules/errors');
const { Community, Event } = require('../../modules/models');
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

module.exports = {
    createCommunity,
    getEvents,
    createEvent,
};
