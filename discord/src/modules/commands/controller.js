const { IsperiaService } = require('../../services');

async function createUser(ctx, roles) {
    const discordId = ctx.message.author.id;
    const name = ctx.message.author.tag;
    const { userId } = await IsperiaService.createUser(name);
    await ctx.bot.createUserMap(discordId, userId, roles);
    return { discordId, userId };
}

module.exports = {
    Controller: {
        createUser,
    },
};
