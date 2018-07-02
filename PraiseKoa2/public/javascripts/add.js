window.add = function (num) {
    return +num + 1;
}

SystemJS.config({
    baseURL: '/javascripts'
});

SystemJS.import('thumb.js').then(function (m) {
    $.extend({
        thumb: m.default
    });
    // 需要通过请求返回对应的初始化数量
    axios.get('/php?action=select')
        .then(response => {
            if (response.data.error == 0) {
                callBack(response.data.num);
                $('.now_count').text(response.data.num);
                console.log(`初始化数据：${response.data.num}`);
            } else {
                alert('创建数据失败')
            }
        })
        .catch(error => {
            alert('服务访问失败')
            console.log(error);
        });

});

function callBack(num) {
    var f = new $.thumb(num, $('#thumb'));
    f.clickAction();
}