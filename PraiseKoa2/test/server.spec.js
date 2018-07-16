'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app_server = require('../app_server');

var _app_server2 = _interopRequireDefault(_app_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requester() {
    return (0, _supertest2.default)(_app_server2.default.listen());
}

describe('node接口测试', function () {
    it('点赞接口测试', function (done) {
        requester().get('/php?action=select').expect(200).end(function (err, res) {
            console.log('res输出：');
            console.log(res.text);
            // if (res.msg == "success") {
            //     done();
            // } else {
            //     done(err);
            // }
            //   if (err) throw err;
            done();
        });
    });
});
