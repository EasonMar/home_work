'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = function () {
    function PraiseButton(num, element) {
        _classCallCheck(this, PraiseButton);

        this.num = num;
        this.element = element;
    }

    _createClass(PraiseButton, [{
        key: 'clickAction',
        value: function clickAction() {
            var _this = this;

            this.element.click(function () {
                if ($('#animation').hasClass('num')) return false;

                if (_this.element.hasClass('stop')) {
                    _this.element.css({ 'background': 'url(/images/thumb.jpg) no-repeat', 'backgroundSize': 'contain', 'width': '300px' });
                    _this.element.removeClass('stop');
                }

                if (_this.num < 10) {
                    $('#animation').addClass('num');

                    setTimeout(function () {
                        $('#animation').removeClass('num');
                    }, 300);
                    var now = add(_this.num);
                    axios.get('/php?action=update&num=' + now).then(function (response) {
                        if (response.data.error == 0) {
                            _this.num = now;
                            console.log('点赞成功~!');
                        } else {
                            alert('点赞失败');
                        }
                    }).catch(function (error) {
                        alert('服务访问失败');
                        console.log(error);
                    });
                } else {
                    _this.element.css({ 'background': 'url(/images/thumb10.jpg) no-repeat', 'backgroundSize': 'contain', 'width': '428px' });
                    _this.element.addClass('stop');
                    axios.get('/php?action=update&num=0').then(function (response) {
                        if (response.data.error == 0) {
                            _this.num = 0;
                            console.log('点赞成功~!');
                            console.log(response.data);
                        } else {
                            alert('点赞失败');
                        }
                    }).catch(function (error) {
                        alert('服务访问失败');
                        console.log(error);
                    });
                }
                console.log('\u73B0\u5728\u70B9\u8D5E\u6570\u4E3A:' + _this.num);
            });
        }
    }]);

    return PraiseButton;
}();

exports.default = PraiseButton;
