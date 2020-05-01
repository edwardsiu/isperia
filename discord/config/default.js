module.exports = {
    discord: {
        token: process.env.DISCORD_TOKEN,
        prefix: '!',
    },
    isperia: {
        auth_url: 'https://isperia.auth0.com/oauth/token',
        client_id: process.env.ISPERIA_CLIENT_ID,
        client_secret: process.env.ISPERIA_CLIENT_SECRET,
        audience: 'https://isperia.server',
    },
};

