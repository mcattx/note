const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!'
});

router.get('/te', (ctx, next) => {
    ctx.body = 'Hello Te'
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(9527);