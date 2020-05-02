const Discord = require('discord.js');
const _ = require('lodash');
const { MongoClient } = require('mongodb');
const commands = require('./modules/commands');
const { Embed, Fmt } = require('./modules/embeds');
const { Collections, ReservedCommands } = require('./modules/enums');
const { parseMessage } = require('./modules/utils');

/**
 * @typedef {Object} UserMap
 * @property {String} discordId Discord user's snowflake
 * @property {String} userId UserId in isperia-server api
 * @property {Object} roles
 */

/**
 * @typedef {Object} GuildMap
 * @property {String} discordId Discord guild's snowflake
 * @property {String} communityId CommunityId in isperia-server api
 */

/**
 * @typedef {Object} CommandContext
 * @property {BotClient} bot
 * @property {MongoClient} db
 * @property {Discord.Message} message
 * @property {UserMap} user
 * @property {GuildMap} [guild]
 */

/**
 * @extends Discord.Client
 */
class BotClient extends Discord.Client {
    constructor(options) {
        if (!options.prefix) {
            throw new Error('prefix is required');
        }
        if (!options.database) {
            throw new Error('database is required');
        }
        super(options);
        this.context = options.context || {};
        this.prefix = options.prefix;
        this.db = options.database;
    }

    /**
     * @param {Discord.Message} message
     * @returns {Promise<CommandContext>}
     */
    async initializeContext(message) {
        const [
            user,
            guild,
        ] = await Promise.all([
            this.getUserMap(message.author.id),
            this.getGuildMap(_.get(message, 'guild.id')),
        ]);
        return {
            bot: this,
            db: this.db,
            message,
            user,
            guild,
            ...this.context,
        };
    }

    async resolve(message) {
        if (message.content[0] !== this.prefix) return;
        const { command, argv } = parseMessage(message);
        if (!commands[command] && !ReservedCommands[command]) return;
        const ctx = await this.initializeContext(message);
        if (ReservedCommands[command]) {
            return this[command](ctx, argv);
        }
        return commands[command].resolve(ctx, argv);
    }

    async help(ctx, argv) {
        if (argv.length) {
            const command = argv[0];
            if (!commands[command]) {
                return ctx.message.channel.send(Embed.error({
                    description: `${Fmt.bold(command)} is not a valid command`,
                }));
            }
            return ctx.message.channel.send(commands[command].help(argv.slice(1)));
        } else {
            const response = Object.keys(commands)
                .sort()
                .map(command => `${Fmt.code(command)} - ${commands[command].description}`)
                .join('\n');
            return ctx.message.channel.send(Embed.info({
                title: 'Help',
                description: response,
            }));
        }
    }

    async createUserMap(discordId, userId, roles) {
        const user = await this.db.collection(Collections.USERS).findOne({ userId });
        if (user) return user;
        await this.db.collection(Collections.USERS).insertOne({
            userId: userId,
            discordId: discordId,
            roles,
        });
        return { discordId, userId, roles }
    }

    async getUserMap(discordId) {
        if (!discordId) return;
        return this.db.collection(Collections.USERS).findOne({
            discordId,
        });
    }

    async createGuildMap(discordId, communityId) {
        const guild = await this.db.collection(Collections.GUILDS).findOne({ communityId });
        if (guild) return;
        return this.db.collection(Collections.GUILDS).insertOne({
            discordId,
            communityId,
        });
    }

    async getGuildMap(discordId) {
        if (!discordId) return;
        return this.db.collection(Collections.GUILDS).findOne({
            discordId,
        });
    }
}

module.exports = {
    BotClient,
};
