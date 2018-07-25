/*
 *@Description 通过HtmlWebpackPlugin自定义处理静态资源
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-05-05
 */
module.exports = function (templateParams, cssList) {

    var _files = templateParams.htmlWebpackPlugin.files;
    console.log('_files文件', _files);

    var _regChunk = templateParams.htmlWebpackPlugin.options.chunks;
    console.log('chunks');
    console.log(_regChunk);

    var _regCss = cssList;
    var _scripts = "";
    var _styles = "";
    for (var i = 0; i < _regChunk.length; i++) {
        _scripts += "<script type='text/javascript'  src='" + _files.chunks[_regChunk[i]]['entry'] + "'></script>";
    }
    for (var k = 0; k < _regCss.length; k++) {
        var _cssitem = _regCss[k],
            _cssitems = new RegExp("^" + _cssitem), // 以_cssitem开头
            _cssiteme = new RegExp(".css$");  // 以.css结尾
        (_files.css).map(function (filename) {
            var _filearr = filename.split('/'),  // '/'分解
                filrdata = _filearr[_filearr.length - 1]; // 取最后一部分

            // 判断是否符合cssList里的条件
            if (_cssitems.test(filrdata) && _cssiteme.test(filrdata)) {
                _styles += '<link rel="stylesheet" type="text/css" href="' + filename + '"/>';
            }
        });
    }
    return {
        scripts: _scripts,
        styles: _styles
    }
}