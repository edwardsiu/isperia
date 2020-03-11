const uniqid = require('uniqid');

async function traceRequests(ctx, next) {
    ctx.state.traceId = uniqid();
    await next();
}

module.exports = {
    traceRequests,
};
