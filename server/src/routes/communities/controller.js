const _ = require('lodash');

function maskEventSettings(settings) {
    return _.pick(settings, [
        'startDate',
        'endDate',
    ]);
}

module.exports = {
    CommunityController: {
        maskEventSettings,
    },
};
