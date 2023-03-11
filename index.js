"use strict";
exports.__esModule = true;
exports.compile = void 0;
function _padZero(x) {
    return "".concat(x).padStart(2, '0');
}
function yyyy(d) {
    return _padZero(d.getFullYear());
}
function MM(d) {
    return _padZero(d.getMonth() + 1);
}
function dd(d) {
    return _padZero(d.getDate());
}
function HH(d) {
    return _padZero(d.getHours());
}
function mm(d) {
    return _padZero(d.getMinutes());
}
function ss(d) {
    return _padZero(d.getSeconds());
}
var PICKERS = {
    yyyy: yyyy,
    MM: MM,
    dd: dd,
    HH: HH,
    mm: mm,
    ss: ss
};
function buildAst(str) {
    var result = [];
    var token = [];
    var lastType = '';
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        var charType = '';
        if (/[\s\-/:]/i.test(char)) {
            charType = 'sp';
        }
        if (/[yMdHms]/.test(char)) {
            charType = 'placeholder';
        }
        if (/[X]/.test(char)) {
            charType = 'timezone';
        }
        if (charType === lastType || lastType === '') {
            token.push(char);
        }
        else {
            result.push(token.join(''));
            token = [char];
        }
        lastType = charType;
    }
    result.push(token.join(''));
    return result;
}
var formatters = {};
function compile(layout) {
    var ast = buildAst(layout);
    var formatter = function format(d) {
        var result = '';
        for (var _i = 0, ast_1 = ast; _i < ast_1.length; _i++) {
            var p = ast_1[_i];
            if (p === ' ' || p === '/' || p === '-' || p == ':') {
                result += p;
                continue;
            }
            var picker = PICKERS[p];
            result += picker.call(null, d);
        }
        return result;
    };
    formatters[layout] = formatter;
    return formatter;
}
exports.compile = compile;
// function formatWithReduce(x: Date, layout: string) {
//   let parts = [
//     ['yyyy', _padZero(x.getFullYear())],
//     ['MM', _padZero(x.getMonth() + 1)],
//     ['dd', _padZero(x.getDate())],
//     ['HH', _padZero(x.getHours())],
//     ['mm', _padZero(x.getMinutes())],
//     ['ss', _padZero(x.getSeconds())],
//   ];
//   return parts.reduce((str, part) => {
//     return str.replace(part[0], part[1]);
//   }, layout);
// }
// const layout = 'yyyy-MM-dd HH:mm:ss';
// const format = compile(layout);
// const now = new Date();
// console.log('format', format(now));
// console.log('formatWithReduce', formatWithReduce(now, layout));
// for (let i = 0; i < 10000; i++) {
//   format(now);
// }
// for (let i = 0; i < 10000; i++) {
//   formatWithReduce(now, layout);
// }
// console.time('format 100000 times with complied formatter');
// for (let i = 0; i < 100000; i++) {
//   format(now);
// }
// console.timeEnd('format 100000 times with complied formatter');
// console.time('format 100000 times with formatWithReduce');
// for (let i = 0; i < 100000; i++) {
//   formatWithReduce(now, layout);
// }
// console.timeEnd('format 100000 times with formatWithReduce');
