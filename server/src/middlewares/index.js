const { errorHandler } = require('./error');
const { traceRequests } = require('./trace');

module.exports = {
    middleware: {
        errorHandler,
        traceRequests,
    },
};
