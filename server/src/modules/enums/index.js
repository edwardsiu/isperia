exports.MAX_SAVED_DECKS = 50;

/**
 * @enum {string}
 */
exports.SortOptions = {
    usage: 'usage',
    usage_rate: 'usage_rate',
    wins: 'wins',
    win_rate: 'win_rate',
};

/**
 * Names of generated reports in the Reports table.
 * @enum {string}
 */
exports.Reports = {
    card_data: 'card_data',
    commander_data: 'commander_data',
};

/**
 * The source of a game or user.
 * @enum {string}
 */
exports.SupportedSource = {
    discord: 'discord',
};

/**
 * @enum {string}
 */
exports.EventStatus = {
    scheduled: 'scheduled',
    active: 'active',
    ended: 'ended',
};
