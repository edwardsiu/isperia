/**
 * @enum {String}
 */
exports.ReservedCommands = {
    help: 'help',
};

/**
 * @enum {String}
 */
exports.Collections = {
    USERS: 'users',
    GUILDS: 'guilds',
};

/**
 * @enum {String}
 */
exports.Roles = {
    // Message must be in a guild
    GUILD: 'guild',
    // Message author must be a server admin
    ADMIN: 'admin',
    // Message author must be the bot owner
    OWNER: 'owner',
};
