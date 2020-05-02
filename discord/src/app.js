const config = require('config');
const { MongoClient } = require('mongodb');
const { BotClient } = require('./bot');
const { IsperiaService } = require('./services');
const mongodbUri = config.get('mongodb.uri');
const mongoClient = new MongoClient(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoClient.connect().then(() => {
    const bot = new BotClient({
        prefix: config.get('discord.prefix'),
        database: mongoClient.db(config.get('mongodb.database')),
    });

    bot.on('ready', async () => {
        await IsperiaService.authenticate();
        console.log(`Logged in as ${bot.user.tag}`);
    });

    bot.on('guildCreate', async (guild) => {
        const guildMap = await bot.getGuildByDiscordId(guild.id);
        if (guildMap) return;
        const { communityId } = await IsperiaService.createCommunity(guild.name);
        await bot.createGuildMap(guild.id, communityId);
    });

    bot.on('message', async (msg) => {
        return bot.resolve(msg);
    });

    bot.login(config.get('discord.token'));
}).catch((err) => {
    console.log(err);
});

