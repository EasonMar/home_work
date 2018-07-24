import "../stylesheets/praise.css";

class PraiseButton {
    constructor(num) {
        // 只留下num属性
        this.num = num;
    }
    // 只留个接口
    clickAction() {
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
        console.log(`现在点赞数为:${this.num}`);
    }
}

export default PraiseButton