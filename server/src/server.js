const config = require('config');
const Koa = require('koa');
const KoaBody = require('koa-body');

const { Database } = require('./modules/database');
const logger = require('./modules/logger').named('server');
const { middleware } = require('./middlewares');
const { router } = require('./routes');


const app = new Koa();
app.context.db = new Database();
app.context.db.sync({ force: true });
app.use(middleware.traceRequests);
app.use(middleware.errorHandler);
app.use(KoaBody({
    jsonLimit: '2kb',
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    logger.error(`[${ctx.state.traceId}] ${ctx.status} ${ctx.body}`);
});

const PORT = config.get('server.port');
app.listen(PORT, () => logger.info(`Running on port ${PORT}`));
