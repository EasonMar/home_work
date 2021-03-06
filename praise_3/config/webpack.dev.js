const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/public/javascripts/index.es6'),
            path.join(__dirname, '../src/public/javascripts/add.js')
        ],
        tag: [
            path.join(__dirname, '../src/public/javascripts/tag.es6')
        ]
    },
    output: {
        filename: 'public/javascripts/[name]-[hash:5].js',
        path: path.join(__dirname, '../build')
    },
    plugins: [
        // 不明白为什么还要配置这货，前面不是已经解决环境变量的问题了吗，注释掉看看
        // new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"dev"' }),
        // 自动刷新浏览器
        new LiveReloadPlugin({ appendScriptTag: true }),
        // 声明Extract
        new ExtractTextPlugin("public/stylesheets/[name]-[hash:5].css"),
        // 提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'public/javascripts/common/vendor-[hash:5].min.js',
        }),
        // 将打包出来的文件引入模板内
        new HtmlWebpackPlugin({
            filename: './views/praise.html',// 最终生成的html
            template: 'src/views/praise.js',
            inject: false,
            chunks: ['vendor', 'index', 'tag'],
            favicon: 'src/public/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            template: 'src/views/index.html',
            inject: false,
            favicon: 'src/public/favicon.ico'
        })
    ],
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:5].[ext]',
                        outputPath: 'public/images/',
                        // publicPath: '127.0.0.1:3000/public/images/' // 路径不完整，失败
                        // publicPath: '../images/'
                        publicPath: 'http://127.0.0.1:3000/public/images/'
                    }
                }
            }
        ]
    }
};