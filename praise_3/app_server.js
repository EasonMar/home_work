'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');
var axios = require('axios');
var Route = require('koa-route');
var Static = require('koa-static');
var views = require('koa-views');
var app = new Koa();


// Must be used before any router is used
// 设置模板路径和扩展名
app.use(views(__dirname + '/views', { extension: 'html' }));

// 设置静态资源路径
app.use(Static(__dirname + '/public'));

// 设置路由
var main = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return ctx.render('index');

                    case 2:
                        return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function main(_x) {
        return _ref.apply(this, arguments);
    };
}();
var index = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return ctx.render('praise');

                    case 2:
                        return _context2.abrupt('return', _context2.sent);

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function index(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

// 封装php点赞接口
var getphp = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        var url, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        url = 'http://127.0.0.1/JCYD_PHP/HomeWork/work2/index.php';
                        // let data = 'action=select'; // $_POST、$_GET只识别"key=value"字符串形式的参数
                        // let data = {action:'select'}; // 如果要传json参数，PHP后端需要配合调整

                        data = 'action=' + ctx.request.query.action;

                        if (ctx.request.query.num) {
                            data += '&num=' + ctx.request.query.num;
                        }

                        // 注意，这里有一个异步操作！！需要不能用同步回调的方式写！！
                        // 估计axios要配置formData形式的上传,PHP才能收到
                        _context3.next = 5;
                        return axios.post(url, data).then(function (response) {
                            // console.log(response.data);
                            return response.data;
                        }).catch(function (error) {
                            // console.log(error);
                            return error;
                        });

                    case 5:
                        ctx.body = _context3.sent;

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getphp(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

app.use(Route.get('/', main));
app.use(Route.get('/index/index', index));
app.use(Route.get('/php', getphp));

// 错误处理
var handler = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return next();

                    case 3:
                        _context4.next = 9;
                        break;

                    case 5:
                        _context4.prev = 5;
                        _context4.t0 = _context4['catch'](0);

                        ctx.status = _context4.t0.statusCode || _context4.t0.status || 500;
                        ctx.body = {
                            message: _context4.t0.message
                        };

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 5]]);
    }));

    return function handler(_x4, _x5) {
        return _ref4.apply(this, arguments);
    };
}();
var InternalErr = function InternalErr(ctx) {
    ctx.throw(500);
};
app.use(handler);
app.use(InternalErr);

app.listen(3000);

exports.default = app;
