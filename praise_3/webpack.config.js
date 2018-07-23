const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, './src/public/javascripts/index.es6'),
            path.join(__dirname, './src/public/javascripts/add.js')
        ],
        tag:[
            path.join(__dirname, './src/public/javascripts/tag.es6')
        ]
    },
    output: {
        filename: 'public/javascripts/[name]-[hash:5].js',
        path: path.join(__dirname, './build')
    }
};