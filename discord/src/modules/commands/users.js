const { Command } = require('./command');
const { Embed } = require('../embeds');

const register = new Command({
    name: 'register',
    description: 'Register to the current active event',
    help: () => 'Register to the current active event',
    resolver: async function (ctx) {
        ctx.message.channel.send(Embed.success({
            description: `User created for **${ctx.message.author.username}**`,
        }));
    }
});

module.exports = {
    register,
};
