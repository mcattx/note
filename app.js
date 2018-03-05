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


app.use(async(ctx, next) => {
  try {
    await next()
    // handle 404
    if (ctx.status === 404) {
      console.log(404)
    } 
  } catch (err) {
    // handle 500
    ctx.status = 500
    ctx.body = '500'
  }
});


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
});

/** about page */
router.get('/about', (ctx) => {
  return ctx.render('about')
});

/** admin page */
router.get('/admin', (ctx) => {
  return ctx.render('admin')
});

/** login page */
router.get('/login', (ctx) => {
  return ctx.render('login')
})

router.get('/asd', (ctx) => {
  throw new Error('500')
})

/** use Router in Koa */
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async(ctx) => {
  if (parseInt(this.status) === 404) {
    this.body = '404'
  }
});

app.listen(9527);