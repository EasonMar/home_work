import PraiseButton from './index.es6'
const f = new PraiseButton();
let t = "";
xtag.register('x-praise', {
  content: "<div class='hand' id='thumb'>" +
    "<div class='finger'></div>" +
    "<div class='finger'></div>" +
    "<div class='finger'></div>" +
    "<div class='finger'></div>" +
    "<div class='finger thumb'></div>" +
    "<div class='arm'></div>" +
    "</div>" +
    "<span class='hide' id='animation'>+1</span>",

  methods: {
    praise: function () {
      let _this = this;
      f.clickAction();
      let animation = _this.querySelector("#animation");
      animation.className = "hide num";
      setTimeout(function () {
        animation.className = "hide"
      }, 800)
    }
  },

  events: {
    click: function (e) {
      let _this = this;
      if (e.target.id == "thumb") { //首先判断点击事件是否点击到thumb
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(() => {
          _this.praise();
        }, 500);
      }
    },
  }
});