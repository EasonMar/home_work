const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/public/javascripts/index.es6'),
            path.join(__dirname, '../src/public/javascripts/add.js')
        ],
        tag:[
            path.join(__dirname, '../src/public/javascripts/tag.es6')
        ]
    },
    output: {
        filename: 'public/javascripts/[name]-[hash:5].js',
        path: path.join(__dirname, '../build')
    },
    plugin: [
        // 不明白为什么还要配置这货，前面不是已经解决环境变量的问题了吗
        new webpack.DefinePlugin({'process.env.NODE_ENV':'"prod"'}),
        // 自动刷新浏览器
        new LiveReloadPlugin({appendScriptTag:true})
    ]
};