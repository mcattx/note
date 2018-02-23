const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const Views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(Views(path.join(__dirname + '/templates'), {
  map: {
    njk: 'nunjucks'
  },
  extension: 'njk'
}));

router.get('/', (ctx, next) => {
  return ctx.render('index', {
    username: 'macat',
    items: {
      'te': 'name',
      'name': 'apple'
    }
  })
});
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9527);