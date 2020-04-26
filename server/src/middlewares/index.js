const { authenticate } = require('./auth');
const { errorHandler } = require('./error');
const { traceRequests } = require('./trace');

module.exports = {
    middleware: {
        authenticate,
        errorHandler,
        traceRequests,
    },
};
