const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const Views = require('koa-views');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

/** use static assets */
app.use(serve(path.join(__dirname + '/assets')));

/** use template engine in Koa */
app.use(Views(path.join(__dirname + '/templates'), {
  map: {
    njk: 'nunjucks'
  },
  extension: 'njk'
}));

/** define router */
router.get('/', (ctx) => {
  return ctx.render('index', {
    username: 'macat',
    items: {
      'te': 'name',
      'name': 'apple'
    }
  })
});

/** article page */
router.get('/article', (ctx) => {
  return ctx.render('article')
});

/** archive page */
router.get('/archive', (ctx) => {
  return ctx.render('archive')
})

/** use Router in Koa */
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9527);