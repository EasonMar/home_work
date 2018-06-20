const Koa = require('koa');
const Request = require('request');
const Route = require('koa-route');
const Static = require('koa-static');
const views = require('koa-views');
const app = new Koa();

// Must be used before any router is used
// 设置模板路径和扩展名
app.use(views(__dirname + '/views', { extension: 'html' }));

// 设置静态资源路径
app.use(Static(__dirname + '/public'));


// 设置路由
const main = async ctx => await ctx.render('index');
const index = async ctx => await ctx.render('praise');
const getphp = (ctx, next) => {
    let url = 'http://127.0.0.1/JCYD_2pro_PHP/index.php';
    let data = { action: 'select' }

    // // 因为回调函数是异步的,如果直接这样写,相当于没有给定响应！！
    // Request.post({ url: url, formData: data }, function (error, response, body) {
    //     if (error) {
    //         console.log(error);
    //         next();
    //     }
    //     console.log(body);
    //     ctx.body = "body";
    // });


    // 注意，这里有一个异步操作！！需要不能用同步回调的方式写！！
    Request.post({ url: url, formData: data }, async function (error, response, body) {
        if (error) {
            console.log(error);
            await next();
        }
        console.log(await ctx)
    });

    ctx.body = 123;

    // // let data = ctx.Request
    // let url = 'http://127.0.0.1/JCYD_2pro_PHP/index.php';
    // axios.post(url, { action: 'select' })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     next();
    //   });
}
app.use(Route.get('/', main));
app.use(Route.get('/index/index', index));
app.use(Route.get('/php', getphp));

// 错误处理
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
const InternalErr = ctx => {
    ctx.throw(500);
};
app.use(handler);
app.use(InternalErr);

app.listen(3000);