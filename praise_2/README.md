[TOC]

## 一、PHP+MySQL接口
- 这个比较简单，就不列出思路了
- 这部分作业的PHP文件放在另外仓库了，[放在这里](https://github.com/EasonMar/JCYD_PHP/tree/master/HomeWork/work2)

------------------------------------------------------
## 二、KOA2+ES6封装点赞接口

> Koa 就是一种简单好用的 Web 框架。它的特点是优雅、简洁、表达力强、自由度高。本身代码只有1000多行，所有功能都通过插件实现，很符合 Unix 哲学     
> 先简单粗暴，并没有很好的进行项目架构上的设计，先把系统打通，后面再学习合理的项目架构

### 1. KOA2建立路由
- 使用[koa-route](https://www.npmjs.com/package/koa-route)配置路由

### 2. 静态资源配置
- 使用[koa-static](https://www.npmjs.com/package/koa-static)配置静态资源
- 特别注意：设置了静态资源目录之后，引入静态资源的路径要明确，如下所示
```
/javascripts/xxx.js  √
/stylesheets/xxx.css √

javascripts/xxx.js  ×
stylesheets/xxx.css ×

./javascripts/xxx.js  ×
./stylesheets/xxx.css ×
```

### 3. 设置项目模板
- 使用[koa-views](https://github.com/queckezz/koa-views)设置项目模板
- 模板设置为html，没有像示例那样设为swig

### 4. praise项目迁移
- 这部分比较简单，各资源路径匹配好即可，使用设置了静态资源目录之后的资源路径

### 5. 错误处理
- 暂未研究...

------------------------------------------------------
## 三、koa后端请求PHP

> 在后端要用什么请求后端呢？以前没有处理过这些情况。查资料后发现可以用`request模块`、`node内置http模块`，后面发现要求中有提到`axios`，那干脆直接用`axios`来处理后端之间的请求好了！

### 1. axios

#### 简介

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

#### 特性

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- ……

#### 基本使用

- 执行 GET 请求
```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

- 执行 POST 请求
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// 这里有一个坑：如果要直接传 json 形式的参数，是需要后端配合的！
// 解决这个坑的时候，走了弯路，以为必须传递formData上去才行，于是有下面的分析
```

#### axios支持formData上传，但是node端不支持FormData
- 当前的PHP写的是form表单上传的接收形式
- 所以axios也要上传formData后台才能收到!  
- 但是怎么在Node端定义formData？做不到啊！
- 而且正常前端ajax请求后端php时,也没有一定要formData啊...  
- 想读取PHP接收到的post原始信息页没办法，怎么搞啊...

#### - 问题终解决

- 当前php获取请求参数的写法(`$_POST/$_GET`)，要求请求参数必须使用`key=value`字符串的形式传参！
- 问题解决过程：
```
1 - 使用request模块，发现其使用的是回调机制，这样无法跟async await搭配，ctx.body赋值失效
2 - 改用axios模块，因其返回promise，可以跟在await后面，ctx.body正常赋值，但是PHP端返回读取不到action参数
3 - 以为要使用表单数据才行，但是Node端不支持FormData 对象，无法将数据转为表单数据
4 - 转念一想，不对啊，当初ajax请求php也是直接用json数据，为啥这里不行
5 - 测试在html端直接使用axios请求php，结果也报读取不到action参数！！
6 - 在前端页面中直接使用jq.ajax来进行请求 --- 结果是可以的！！为啥axios就不行呢？
7 - 貌似找到答案了！(见参考资料一)
8 - 不能直接传json过去，需要把json转换为string，jq.ajax内部处理了我们直接提交的json数据！！
    JQ.ajax： data  类型：String  
    发送到服务器的数据。将自动转换为请求字符串格式。
    GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。
    必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。
    如 {foo:["bar1", "bar2"]} 转换为 '&foo=bar1&foo=bar2'。
9 - 因为不管是get还是post，formData都是以"key=value"字符串的形式存在的！！$_GET、$_POST只能收到此种形式！
10 - 使用file_get_contents('php://input')可以获取请求参数为json形式的场景！
11 - 总结，自己对http请求参数的套路不熟悉！
```
- [相关参考资料一：axios post数据 php 无法获取](https://segmentfault.com/q/1010000009057655)
- [相关参考资料二：php接收json格式数据](https://www.cnblogs.com/wanghaokun/p/6692281.html)

------------------------------------------------------
## 四、稀释点击事件

### 1. 函数式编程思路
- 暂未研究...

### 2. 课堂方法
- 使用setTimeout来延迟执行点击
- 如果延迟期内再次点击，则重新计时等待延迟

------------------------------------------------------
## 五、自动化测试

### 1. 接口测试
- mocha：mochawesome、mochaRunner.js
- service.spec.js：supertest
- 用babel对app.js进行编译，生成了regeneratorRuntime，然后测试过程中报错
```
ReferenceError: regeneratorRuntime is not defined

// babel官网的解释：
Runtime required
You need to use either the Babel polyfill or the regenerator runtime so that regeneratorRuntime will be defined.
```

- 果然，引入了`babel-polyfill`问题就解决了！早就该看文档
- 配置package.json里的script
```
"service": "mocha" 
```
- 执行`npm run service`：总是把test文件夹内所有的`xx.spec.js`文件都执行完，并且不会退出程序，也没生成报告？
- 怀疑package.json里的script配置错了，更换node命令试一试：`node ./mochaRunner.js`，果然就行了！
- 换回mocha命令，同时指定对应的mochaRunner：`mocha ./mochaRunner.js`：果然也行了！--- 这里是课堂中没讲清楚留下的坑！

### 2. 单元测试
- karma：失败
```
// 配置错了，误以为koa中配置的app.use(Static(__dirname + '/public'))在这里也能生效！
files: ['/javascripts/add.js','index.spec.js']
// 这是两套东西，怎么会生效呢？ 正确的文件路径应该是相对于karma.conf.js的路径
files: ['./public/javascripts/add.js','./index.spec.js'],
```

### 3. E2E测试
- 安装selenium-webdriver
- 下载浏览器驱动
- 示例中写的方法有点行不通！`driver.wait`貌似不太行，可能用法错了！！
- 自己用`driver.sleep`等待一定时间，让页面加载完成、接口读取完成！就可以自动进行click操作了
- 因为这东西是跑在node里的，所以只要node版本够新，就可以毫无顾忌地直接跑最新的js语法！不用去编译