import superagent from 'supertest';
import app from '../app_server';

function requester() {
    return superagent(app.listen());
}

describe('node接口测试', function () {
    it('点赞接口测试', function (done) {
        requester()
            .get('/php?action=select')
            .expect(200)
            .end(function (err, res) {
                console.log('res输出：')
                console.log(res.data);
                // if (res.msg == "success") {
                //     done();
                // } else {
                //     done(err);
                // }
                //   if (err) throw err;
                done();
            });
    })
})