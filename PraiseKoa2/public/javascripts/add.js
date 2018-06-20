window.add = function (num) {
    return num + 1;
}

SystemJS.config({
    baseURL: '/javascripts'
});

SystemJS.import('thumb.js').then(function (m) {
    $.extend({
        thumb: m.default
    });
    callBack();
});

function callBack() {
    var f = new $.thumb(0, $('#thumb'));
    f.clickAction();
}