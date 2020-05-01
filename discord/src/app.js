const config = require('config');
const { BotClient } = require('./bot');
const { IsperiaService } = require('./services');

const bot = new BotClient({
    prefix: config.get('discord.prefix'),
});

bot.on('ready', async () => {
    await IsperiaService.authenticate();
    console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', async (msg) => {
    return bot.resolve(msg);
});

bot.login(config.get('discord.token'));
