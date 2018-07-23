class PraiseButton {
    constructor(num, element) {
        this.num = num;
        this.element = element;
    }
    clickAction() {
        this.element.click(() => {
            if($('#animation').hasClass('num')) return false;

            if(this.element.hasClass('stop')){
                this.element.css({'background':'url(../img/thumb.jpg) no-repeat','backgroundSize':'contain','width':'300px'});
                this.element.removeClass('stop');
            }

            if (this.num < 10) {
                $('#animation').addClass('num');
                this.num = add(this.num);
                setTimeout(function () {
                    $('#animation').removeClass('num');
                }, 300);
            } else {
                this.element.css({'background':'url(../img/thumb10.jpg) no-repeat','backgroundSize':'contain','width':'428px'});
                this.element.addClass('stop');
                this.num = 0;
            }
            console.log(this.num);
        })
    }
}

export default PraiseButton;