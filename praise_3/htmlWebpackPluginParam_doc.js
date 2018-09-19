// 这个是执行webpack时，我自行在控制台里打印出来的东西，帮助理解

// 入口文件
{
    publicPath: '../',
    chunks: {
        vendor: {
            size: 1856,
            entry: '../public/javascripts/common/vendor-96ed0.min.js',
            hash: '0dc1da40385af0760414',
            css: [Array]
        },
        index: {
            size: 94,
            entry: '../public/javascripts/index-96ed0.js',
            hash: '5167038b6db5ca3cbec5',
            css: []
        },
        tag: {
            size: 1995,
            entry: '../public/javascripts/tag-96ed0.js',
            hash: 'b9c0b54aa02b8fec111d',
            css: []
        }
    },
    js: ['../public/javascripts/common/vendor-96ed0.min.js',
        '../public/javascripts/index-96ed0.js',
        '../public/javascripts/tag-96ed0.js'
    ],
    css: ['../public/stylesheets/vendor-96ed0.css'],
    manifest: undefined
}

// chunks
['vendor', 'index', 'tag'];


// templateParams.htmlWebpackPlugin
{
    files: {
        publicPath: '../',
        chunks: { vendor: [Object], index: [Object], tag: [Object] },
        js: ['../public/javascripts/common/vendor-3d02c.min.js',
            '../public/javascripts/index-3d02c.js',
            '../public/javascripts/tag-3d02c.js'
        ],
        css: ['../public/stylesheets/vendor-3d02c.css'],
        manifest: undefined
    },
    options: {
        template: 'F:\\XRK\\code\\代码段\\module\\demo\\jcydhomework\\home_work\\praise_3\\node_modules\\html-webpack-plugin\\lib\\loader.js!F:\\XRK\\code\\代码段\\module\\demo\\jcydhomework\\ home_work\\ praise_3\\ src\\ views\\ praise.js ',
        templateParameters: [Function: templateParametersGenerator],
        filename: './views/praise.html',
        hash: false,
        inject: false,
        compile: true,
        favicon: false,
        minify: false,
        cache: true,
        showErrors: true,
        chunks: ['vendor', 'index', 'tag'],
        excludeChunks: [],
        chunksSortMode: 'auto',
        meta: {},
        title: 'Webpack App',
        xhtml: false
    }
}