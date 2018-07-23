class PraiseButton {
    constructor(num, element) {
        this.num = num;
        this.element = element;
    }
    clickAction() {
        this.element.click(() => {
            if ($('#animation').hasClass('num')) return false;

            if (this.element.hasClass('stop')) {
                this.element.css({ 'background': 'url(/images/thumb.jpg) no-repeat', 'backgroundSize': 'contain', 'width': '300px' });
                this.element.removeClass('stop');
            }

            if (this.num < 10) {
                $('#animation').addClass('num');

                setTimeout(function () {
                    $('#animation').removeClass('num');
                }, 300);
                let now = add(this.num);
                axios.get(`/php?action=update&num=${now}`)
                    .then(response => {                      
                        if (response.data.error == 0) {
                            this.num = now;
                            $('.now_count').text(this.num);
                            console.log('点赞成功~!')
                        } else {
                            alert('点赞失败')
                        }
                    })
                    .catch(error => {
                        alert('服务访问失败')
                        console.log(error);
                    });
            } else {
                this.element.css({ 'background': 'url(/images/thumb10.jpg) no-repeat', 'backgroundSize': 'contain', 'width': '428px' });
                this.element.addClass('stop');
                $('.now_count').text('');
                axios.get(`/php?action=update&num=0`)
                    .then(response => {                      
                        if (response.data.error == 0) {
                            this.num = 0;
                            console.log('点赞成功~!')
                            console.log(response.data);
                        } else {
                            alert('点赞失败')
                        }
                    })
                    .catch(error => {
                        alert('服务访问失败')
                        console.log(error);
                    });
            }
            console.log(`现在点赞数为:${this.num}`);
        })
    }
}

class Thumb extends PraiseButton{
    constructor(num,element){
        super(num,element);
    }
}
export default Thumb