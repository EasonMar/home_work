[TOC]

---------------------------------------------
## 使用ES6完成点赞+1功能的父类PraiseButton
- 自己对OOP设计思路不熟,而且想太多了,应该以"先完成，后优化作为指导思想"

---------------------------------------------
## 开发子类Thumb实现大拇指方式点赞。
- 觉得题目有误导性
- 说实话，需求描述不清晰不完整，谁知道点赞加一效果具体是什么？
- 这些是留的空间，自己发挥的

---------------------------------------------
## 使用Babel编译ES6代码

### 安装babel包
- npm i babel-cli babel-preset-env -D

### 配置.babelrc配置文件
```js
//.babelrc
{
    "presets": ["env"]
}
```

### babel编译命令行
- babel **src_file** -o **output_file**
- 可以把命令写到package.json的scripts命令中

```js
"scripts": {
    "build": "babel ./scripts/index.es6 -o ./scripts/index.js && babel ./scripts/thumb.es6 -o ./scripts/thumb.js"
}

// 使用npm run build执行编译
```
 
---------------------------------------------
## 使用System.js加载对应编译后的文件

### 什么是 [System.js](https://github.com/systemjs/systemjs/tree/501d1a0b9e32e00d54c9cd747e3236a9df88a1a3)
- System.js是万能模块加载器，==须在服务器环境下才能生效==

### 引入System.js
- 可以直接到 [bootstrapCDN](http://www.bootcdn.cn/) 引入资源
- 本次引入：https://cdn.bootcss.com/systemjs/0.21.3/system.js

### 使用System.js
- 这里仅使用System的模块加载功能

```js
// loads './app.js' from the current directory
SystemJS.import('./app.js').then(function (m) {
    console.log(m); // m就是app.js中导出的模块
});
```
 
---------------------------------------------
## 将编译后的文件挂载为jquery的组件
- 就是jquery的插件机制而已！

```js
SystemJS.import('thumb.js').then(function (m) {
    $.extend({
        thumb: m.default
    });
    callBack();
});
```

---------------------------------------------
## 实现karma完成对点赞+1组件的单元测试

### karma测试环境搭建

#### 安装全局karma、karma-cli：
- npm i karma karma-cli -g
- 注意karma-cli装全局比较方便，否则只能在命令行输入以下语句来运行karma
```
./node_modules/karma/bin/karma start
```

#### 安装断言库jasmine
- npm i karma-jasmine jasmine-core -D

#### 安装无界面浏览器phantomJS
- npm i phantomjs karma-phantomjs-launcher -D

#### 初始化karma，生成karma.conf.js配置文件
- karma init

#### 编写断言文件 xxx.spec.js
- index.spec.js
- [jasmine断言语法](https://blog.csdn.net/guojiangweigege/article/details/52121876)

```js
// Suites(测试程序组)：describe
// Suites直接调用Jasmine的全局函数describe()并传递两个参数：string和function。
// 字符串表示被测试的Suites的名称或者标题。而函数则是需要实现Suites的代码块。

// Specs(测试程序体)：it
// Specs通过调用全局函数it()来定义，跟describe类似的传递两个参数：string和function。字符串是spec的标题，function是测试程序或者测试代码。
// Spec包括一个或多个测试代码的状态期望值（expectations）。Expectations在Jasmine中是一个要么是真要么是假的断言。
// 只有当spec中的断言都为真才可以通过这个测试程序，否则测试返回failing。

// Expectations(期望)：expect
// Expectations是函数expect()建立的，而expect()函数传递一个称为actual（实际值）的参数。
// Expectations链式的连接着传递参数expected（期望值）的Matcher函数。

describe("A suite is just a function", function() {
    var a;
    it("and so is a spec", function() {
        a = true;
        expect(a).toBe(true);
    });
});
```

#### karma测试命令
- karma start  /  karma start xxxx.js(karma配置文件)
- 可以把命令写到package.json的scripts命令中

```js
"scripts": {
    ...
    "unit": "karma start"
}
```

#### 提示如果以上步骤走完还失败，那就再重新装一下包

---------------------------------------------
## 附加：karma-coverage实代码测试现覆盖率检测

### 创建报告文件夹，存放生成的报告
- 建议在根目录下创建一个docs文件夹

### 安装karma-coverage包
- npm i karma-coverage -D

### 更改karma配置

```js
// 配置对哪些文件生成代码测试覆盖率检查 - 原则：测试代码要≥业务代码
preprocessors: {
    'scripts/*.js': ['coverage']
},

// 配置生成怎样的报表
coverageReporter: {
    type : 'html',
    dir : './docs/coverage/'
}
```

---------------------------------------------
## 附加：selenium-webdriver实现E2E测试

### 安装selenium-webdriver包
- npm i selenium-webdriver -D

### [选择安装一款浏览器组件](https://www.npmjs.com/package/selenium-webdriver)
- 您需要下载额外的组件来处理每个主要浏览器。
- Chrome、Firefox和微软的IE和EDGE Web浏览器的驱动程序都是独立的可执行文件，放置到项目根目录下。

### 创建e2e文件夹，存放e2e测试脚本
- 建议在根目录下创建一个e2e文件夹
- e2e文件夹内放置e2e测试脚本：phraiseE2E.js

### 编写selenium测试脚本
- 就是一个运行在node环境下的文件
- [参考学长的代码](https://github.com/pengxiaohua/praise/blob/master/e2e.js)
- ==注意，旧版本的node可能不支持async await方法，需要将node更新为最新版本！否则可能运行不成功。==
- [selenium API 参考](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

```js
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        let i = 0;
        await driver.get('http://127.0.0.1:8080/index.html'); // 需要本地起服务,demo中通过http-server在项目根目录起了一个简易的服务
        await function(){
            do {
                driver.findElement(By.id('thumb')).click();
                i++;
            } while (i < 11)
        };
    } finally {
        await driver.quit(); // 做任何的关于小黑窗的测试一定要记得退出
    }
})();

// 但是这个测试测不出什么结果！需要想想更加合理的测试逻辑
```

### e2e测试命令
- node ./e2e/phraiseE2E.js
- 可以把命令写到package.json的scripts命令中

```js
"scripts": {
    ...
    "e2e": "node ./e2e/phraiseE2E.js"
}
```

### 测试之前需要启动服务，要能在服务中访问到当前项目