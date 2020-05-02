module.exports = {
    is_production: process.env.NODE_ENV === 'production',
    discord: {
        token: process.env.DISCORD_TOKEN,
        prefix: '!',
    },
    isperia: {
        auth_url: 'https://isperia.auth0.com/oauth/token',
        client_id: process.env.ISPERIA_CLIENT_ID,
        client_secret: process.env.ISPERIA_CLIENT_SECRET,
        audience: 'https://isperia.server',
        api_url: 'http://localhost:3000',
    },
    mongodb: {
        uri: process.env.MONGO_CONNECTION_STRING,
        database: 'develop',
    },
    log_level: process.env.LOG_LEVEL || 'debug',
};

