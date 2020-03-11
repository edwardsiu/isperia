module.exports = {
    database: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres',
    },
    server: {
        port: 3000,
    },
    log_level: process.env.LOG_LEVEL || 'debug',
};
