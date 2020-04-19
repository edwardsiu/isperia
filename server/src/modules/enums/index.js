exports.MAX_SAVED_DECKS = 50;

/**
 * @enum {string}
 */
exports.SortOptions = {
    USAGE: 'usage',
    USAGE_RATE: 'usage_rate',
    WINS: 'wins',
    WIN_RATE: 'win_rate',
};

/**
 * Names of generated reports in the Reports table.
 * @enum {string}
 */
exports.Reports = {
    CARD_DATA: 'card_data',
    COMMANDER_DATA: 'commander_data',
};

/**
 * The source of a game or user.
 * @enum {string}
 */
exports.SupportedSource = {
    DISCORD: 'discord',
};

/**
 * @enum {string}
 */
exports.EventStatus = {
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    ENDED: 'ended',
};

/**
 * Deck archetypes/tag names
 * @enum {string}
 */
exports.Archetypes = {
    ALUREN: 'Aluren',
    BIRTHING_POD: 'Pod',
    CHAIN_VEIL: 'Chain Veil',
    CONSULT: 'Consult',
    CURIOSITY: 'Curiosity',
    DIVERGENT: 'Divergent',
    DREDGE: 'Dredge',
    DOOMSDAY: 'Doomsday',
    FOOD_CHAIN: 'Food Chain',
    FUTURE_TOP: 'Future Top',
    HERMIT: 'Hermit',
    HULK: 'Hulk',
    POLYMORPH: 'Polymorph',
    REANIMATOR: 'Reanimator',
    SCEPTER: 'Scepter',
    STAX: 'Stax',
    STORM: 'Storm',
    THIEF: 'Thief',
    TURBO_NAUS: 'Turbo Naus',
    TURNS: 'Turns',
    TWIN: 'Twin',
    UNDERWORLD_BREACH: 'Breach',
};

exports.ArchetypesShort = {
    [exports.Archetypes.BIRTHING_POD]: 'Pod',
    [exports.Archetypes.DOOMSDAY]: 'DD',
    [exports.Archetypes.FOOD_CHAIN]: 'FC',
    [exports.Archetypes.FUTURE_TOP]: 'Top',
    [exports.Archetypes.TURBO_NAUS]: 'Farm',
};

exports.ArchetypePosition = {
    PREFIX: 'prefix',
    SUFFIX: 'suffix',
    SUPER_SUFFIX: 'super_suffix',
};
