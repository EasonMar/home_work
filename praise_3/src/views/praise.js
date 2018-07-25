module.exports = function (templateParams) {
    const _cssList = ['vendor'];
    const webAssetsHelp = require('./webAssetsHelp.js')(templateParams, _cssList);
    let html = `<!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>CSS3手势变换动画特效DEMO演示</title>
            ${webAssetsHelp.styles}
        </head>
        <body>
            <x-praise></x-praise>
        </body>
        <script src="https://cdn.bootcss.com/x-tag/1.5.11/x-tag-core.js"></script>
        <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        ${webAssetsHelp.scripts}
        </html>`;
    return html;
}