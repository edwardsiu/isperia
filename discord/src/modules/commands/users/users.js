const { Command } = require('../command');
const { Embed } = require('../../embeds');
const { Roles } = require('../../enums');
const { Controller } = require('../controller');

const register = new Command({
    name: 'register',
    description: 'Register to the current active event',
    help: () => 'Register to the current active event',
    roles: [ Roles.GUILD ],
    resolver: async function (ctx) {
        // Create user if necessary
        const { userId } = ctx.user || await Controller.createUser(ctx, { });
        // Get the current guild event
        // Register the user to the event
        // Respond with success or failure
        ctx.message.channel.send(Embed.success({
            description: `Registered **${ctx.message.author.tag}**`,
        }));
    }
});

module.exports = {
    register,
};
