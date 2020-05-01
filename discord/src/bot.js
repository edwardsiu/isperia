const Discord = require('discord.js');
const commands = require('./modules/commands');
const { Embed } = require('./modules/embeds');
const { ReservedCommands } = require('./modules/enums');
const { parseMessage } = require('./modules/utils');

/**
 * @typedef {Object} CommandContext
 * @property {BotClient} client
 * @property {Discord.Message} message
 */

/**
 * @extends Discord.Client
 */
class BotClient extends Discord.Client {
    constructor(options) {
        if (!options.prefix) {
            throw new Error('Prefix is required');
        }
        super(options);
        this.context = options.context || {};
        this.prefix = options.prefix;
    }

    /**
     * @param {Discord.Message} message
     * @returns {CommandContext}
     */
    initializeContext(message) {
        return {
            client: this,
            message,
            ...this.context,
        };
    }

    async resolve(message) {
        if (message.content[0] !== this.prefix) return;
        const { command, argv } = parseMessage(message);
        const ctx = this.initializeContext(message);
        if (ReservedCommands[command]) {
            return this[command](ctx, argv);
        }
        if (!commands[command]) return;
        return commands[command].resolve(ctx, argv);
    }

    async help(ctx, argv) {
        if (argv.length) {
            const command = argv[0];
            if (!commands[command]) {
                return ctx.message.channel.send(Embed.error({
                    description: `**${command}** is not a valid command`,
                }));
            }
            return ctx.message.channel.send(commands[command].help(argv.slice(1)));
        } else {
            const response = Object.keys(commands)
                .sort()
                .map(command => `\`${command}\` - ${commands[command].description}`)
                .join('\n');
            return ctx.message.channel.send(Embed.info({
                title: 'Help',
                description: response,
            }));
        }
    }
}

module.exports = {
    BotClient,
};
