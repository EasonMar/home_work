import PraiseButton from './index.es6';

let timer = 0;
let pb = '';
let animation = '';

xtag.register('x-praise', {
    content: `<div class="hand" id="thumb">
                <span class="now_count"></span>
              </div>
              <span class="hide" id="animation">+1</span>`,
    lifecycle: {
        created: function () {
            // 通过请求返回对应的初始化数量
            axios.get('/php?action=select')
                .then(response => {
                    if (response.data.error == 0) {
                        let initData = response.data.num
                        $('.now_count').text(initData);
                        pb = new PraiseButton(initData);
                        console.log(`初始化数据：${initData}`);
                    } else {
                        $('.now_count').text(0);
                        pb = new PraiseButton(0);
                        alert('初始化数据失败');
                    }
                })
                .catch(error => {
                    alert('服务访问失败');
                    console.log(error);
                });
        },
        inserted: function () {
            // 对应操作的element到这里才查找
            animation = this.querySelector("#animation");
        }
    },
    methods: {
        praise: function () {
            pb.clickAction();
            animation.className = 'hide num';
            setTimeout(() => { animation.className = 'hide' }, 800);
        }
    },
    events: {
        click: function (e) {
            // 判断点击事件源
            if (e.target.id = 'thumb') {
                // 事件稀释
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => { this.praise() }, 300);
            }
        }
    }
});