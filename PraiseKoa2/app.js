const Koa = require('koa');
const axios = require('axios');
const Route = require('koa-route');
const Static = require('koa-static');
const views = require('koa-views');
const app = new Koa();
import 'babel-polyfill';

// Must be used before any router is used
// 设置模板路径和扩展名
app.use(views(__dirname + '/views', { extension: 'html' }));

// 设置静态资源路径
app.use(Static(__dirname + '/public'));


// 设置路由
const main = async ctx => await ctx.render('index');
const index = async ctx => await ctx.render('praise');

// 封装php点赞接口
const getphp = async ctx => {
    // let url = 'http://127.0.0.1/JCYD_2pro_PHP/index.php';
    let url = 'http://127.0.0.1/JCYD_PHP/index.php';
    // let data = 'action=select'; // $_POST、$_GET只识别"key=value"字符串形式的参数
    // let data = {action:'select'}; // 如果要传json参数，PHP后端需要配合调整
    let data = 'action=' + ctx.request.query.action;
    if(ctx.request.query.num){
        data += `&num=${ctx.request.query.num}`
    }

    // 注意，这里有一个异步操作！！需要不能用同步回调的方式写！！
    // 估计axios要配置formData形式的上传,PHP才能收到
    ctx.body = await axios.post(url, data)
        .then(function (response) {
            // console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            // console.log(error);
            return error
        });
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

export default app;