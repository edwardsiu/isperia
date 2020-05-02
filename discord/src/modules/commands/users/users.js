const { Command } = require('../command');
const { Embed, Fmt } = require('../../embeds');
const { Roles } = require('../../enums');
const { Controller } = require('../controller');
const { IsperiaService } = require('../../../services');

const register = new Command({
    name: 'register',
    description: 'Register to the current active event',
    help: () => 'Register to the current active event',
    roles: [ Roles.GUILD ],
    resolver: async function (ctx) {
        // Create user if necessary
        const { userId } = ctx.user || await Controller.createUser(ctx, { });
        // Register to event
        const event = await IsperiaService.registerToCurrentCommunityEvent(userId, ctx.guild.communityId);
        // Respond with success or failure
        if (event && event.name) {
            ctx.message.channel.send(Embed.success({
                description: `Registered ${Fmt.bold(ctx.message.author.tag)} to ${Fmt.bold(event.name)}`,
            }));
        } else {
            ctx.message.channel.send(Embed.error({
                description: `Failed to register ${Fmt.bold(ctx.message.author.tag)}`,
            }));
        }
    }
});

module.exports = {
    register,
};
