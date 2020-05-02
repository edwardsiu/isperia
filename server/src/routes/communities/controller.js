const _ = require('lodash');
const moment = require('moment');
const { Event } = require('../../modules/models');

function maskEventSettings(settings) {
    return _.pick(settings, [
        'startDate',
        'endDate',
    ]);
}

async function getActiveEvents(communityId) {
    const events = await Event.findAll({
        where: { communityId },
    });
    if (!events) return [];
    return events.filter((event) => {
        if (!event.settings.startDate) return false;
        const today = moment();
        return today >= moment(event.settings.startDate) && today < moment(event.settings.endDate);
    }).sort((a, b) => moment(a.startDate) - moment(b.startDate));
}

async function getNewestActiveEvent(communityId) {
    const activeEvents = await getActiveEvents(communityId);
    return _.last(activeEvents);
}

module.exports = {
    CommunityController: {
        maskEventSettings,
        getActiveEvents,
        getNewestActiveEvent,
    },
};
