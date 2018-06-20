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
                    _this.num = add(_this.num);
                    setTimeout(function () {
                        $('#animation').removeClass('num');
                    }, 300);
                } else {
                    _this.element.css({ 'background': 'url(/images/thumb10.jpg) no-repeat', 'backgroundSize': 'contain', 'width': '428px' });
                    _this.element.addClass('stop');
                    _this.num = 0;
                }
                console.log(_this.num);
            });
        }
    }]);

    return PraiseButton;
}();

exports.default = PraiseButton;
