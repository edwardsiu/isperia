const config = require('config');
const winston = require('winston');

const logFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
);

function named(name) {
    return winston.createLogger({
        level: config.get('log_level'),
        format: winston.format.combine(
            winston.format.label({ label: name }),
            winston.format.timestamp(),
            logFormat,
        ),
        transports: [
            new winston.transports.Console({
                level: config.get('log_level'),
            }),
        ],
    });
}

module.exports = {
    named,
};
