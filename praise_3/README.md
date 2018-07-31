> 基于praise_2项目，完成这次项目

### 要求一：使用X-TAG封装点赞组件

1. 引入X-TAG CDN资源，使用1.5.11版本：https://cdn.bootcss.com/x-tag/1.5.11/x-tag-core.js
2. 复制X-TAG官网文档中的内容，并修改component的name和content内容即可
- 为什么样式会变呢？就是因为外面套了个`<x-praise>`？
```
因为<x-praise>不是标准的html标签，在浏览器内无法形成样式
而.hand的相对定位此时应该是失效的...
```

### 要求二：使用Gulp编译KOA2源代码并能监控源码变化自动编译

1. 安装所需要的依赖包：`gulp`、`gulp-babel`
2. 创建`gulpfile.js`，复制`gulp-babel`文档中的`usage`代码过来改写
```
// 可以使用数组来匹配需要操作的文件，前面加！表示排除
gulp.src(['src/**/*.es6','!src/public/**/*.es6'])

// glob规则
// ** 跨路径匹配任意字符
// * 匹配任意 0 或多个任意字符
```

### 要求三：使用Webpack3配置上线版本、开发版本配置文件，并能监控文件的变化自动刷新浏览器

1. 安装webpack相关依赖包，安装webpack3：`webpack3.8.1`
2. 创建`webpack.config.js`，依据官方文档改写配置
3. 引入`webpack`，待会需要用到webpack内置的插件
4. 配置入口、输出：配置多个入口文件
```
// 多入口写法，一个入口又可以有多个文件？
entry: {
    index: [
        path.join(__dirname, './src/public/javascripts/index.es6'),
        path.join(__dirname, './src/public/javascripts/add.js')  // 示例中非要把add.js改为add.es6，不知道为啥，我偏偏就用js，貌似也没问题呢
    ],
    tag:[
        path.join(__dirname, './src/public/javascripts/tag.es6')
    ]
},
```

5. 为了趋近示例项目，重写项目结构：合并`index`与`thumb`、把`add.js`里面的`SystemJS`部分内容放到HTML内
6. 创建不同版本的webpack配置文件夹`config`，并创建`webpack.prod.js`、`webpack.dev.js`，将`webpack.config.js`的内容copy到以上两文件中
7. 重写`webpack.config.js`，根据不同环境引用不同的配置文件，这时需要借助`better-npm-run`
8. 安装`better-npm-run`，并重新配置`package.json`
```
"scripts": {
    ……
    "build:dev": "better-npm-run build:dev",  // build:dev，冒号没有什么特殊功能，就是一个字符串，运行得输入npm run build:dev
    "build:prod": "better-npm-run build:prod"
},
"betterScripts": {
    "build:prod": {
        "command": "webpack --progress --colors",
        "env": {
            "NODE_ENV": "prod"
        }
    },
    "build:dev": {
        "command": "webpack --progress --colors",
        "env": {
            "NODE_ENV": "dev"
        }
    }
}
```

9. Node环境变量：`process.env.NODE_ENV`。 [拓展阅读：what is process.env](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)
10. 在`webpack.prod.js`、`webpack.dev.js`中配置`webpack.DefinePlugin(definitions)`
- 不明白为什么还要配置这货，前面不是已经解决环境变量的问题了吗……
```
new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"dev"' })
```

11. 配置`webpack-livereload-plugin`（监测变化，自动刷新浏览器）
```
# for webpack 3
npm install --save-dev webpack-livereload-plugin@1

// webpack.config.js
var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
  plugins: [
    new LiveReloadPlugin({appendScriptTag:true}) // 添加liveReload-script标签
  ]
}
```

12. chrome需要安装扩展程序LiveReload（放最后进行验证）

### 要求四：使用webpack3对CSS、JS进行编译压缩打包并合成MD5

1. 安装依赖包：`babel-loader`，webpack 3.x | babel-loader >= 7.1，
2. 配置loader，运行，竟然TMD报错了，明明跟视频中的一模一样：
```
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration has an unknown property 'plugin'. These properties are valid:

// 原来是前面plugins少写了个s - -！这种粗心大意最浪费时间
// 其实报错也说得很明白了：configuration has an unknown property 'plugin'
```

3. 处理css文件：把css文件引入index.es6中，用`extract-text-webpack-plugin`插件把css抽离出来
```
# for webpack 3 
npm install --save-dev extract-text-webpack-plugin

# 其他依赖包
style-loader、css-loader

// 配置ExtractTextPlugin，文件依然要用MD5的格式
new ExtractTextPlugin("public/stylesheets/[name]-[hash:5].css")
```

4. 对上线版本js代码进行压缩：`webpack.optimize.UglifyJsPlugin`
- [参考文档](https://webpack.js.org/configuration/plugins/)
```
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_console: false,
    }
})
```
5. 对上线版本的css代码进行压缩：`optimize-css-assets-webpack-plugin`