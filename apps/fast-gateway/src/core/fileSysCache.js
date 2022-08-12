"use strict";
exports.__esModule = true;
exports.existsSync = exports.updateFileSync = exports.writeFileSync = exports.readMatchedFileSync = exports.path2FileName = exports.readLocalFile = exports.updateLocalFile = void 0;
/**
 * @description: 资源缓存
 */
var fs = require("fs");
var path = require("path");
var utils_1 = require("@/utils");
var _a = (0, utils_1.getConfig)('GATEWAY_CONFIG'), CACHE_ENABLE = _a.CACHE_ENABLE, ROOT_DIR = _a.ROOT_DIR, GATEWAY_FILENAME = _a.GATEWAY_FILENAME, PAGE_DIR = _a.PAGE_DIR;
/**
 * @description: 初始化根路径
 */
var rootDir = path.resolve(process.cwd(), ROOT_DIR);
if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
}
/**
 * @description: 初始化 page 资源缓存路径
 */
var pageDir = path.resolve(process.cwd(), "".concat(ROOT_DIR, "/").concat(PAGE_DIR));
if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir);
}
var updateLocalFile = function (Local) {
    fs.writeFileSync(path.resolve(rootDir, GATEWAY_FILENAME), JSON.stringify(Local));
};
exports.updateLocalFile = updateLocalFile;
var readLocalFile = function () {
    try {
        return fs.readFileSync(path.resolve(rootDir, GATEWAY_FILENAME)).toString();
    }
    catch (_a) {
        return '{}';
    }
};
exports.readLocalFile = readLocalFile;
function path2FileName(path) {
    var fileName = path;
    if (/\/$/.test(fileName)) {
        fileName += 'index';
    }
    if (!/\.html$/.test(fileName)) {
        fileName += '.html';
    }
    return fileName;
}
exports.path2FileName = path2FileName;
function readMatchedFileSync(hostname, matchedPath) {
    if (!CACHE_ENABLE)
        return undefined;
    var fileName = path2FileName(matchedPath);
    if (fs.existsSync(path.resolve(pageDir, "".concat(hostname, "/").concat(fileName)))) {
        try {
            return fs
                .readFileSync(path.resolve(pageDir, "".concat(hostname, "/").concat(fileName)))
                .toString();
        }
        catch (e) {
            return;
        }
    }
    return;
}
exports.readMatchedFileSync = readMatchedFileSync;
var writeFileSync = function (hostname, matchedPath, html) {
    if (!CACHE_ENABLE)
        return false;
    var fileName = path2FileName(matchedPath);
    try {
        var fileDir = hostname + fileName.split('/').slice(0, -1).join('/');
        if (!fs.existsSync(path.resolve(pageDir, fileDir))) {
            fs.mkdirSync(path.resolve(pageDir, fileDir + '/'), {
                recursive: true
            });
        }
        fs.writeFileSync(path.resolve(pageDir, "".concat(hostname, "/").concat(fileName)), html);
    }
    catch (e) {
        console.error("[writeFileSync] error when writeFileSync ".concat(path.resolve(pageDir, "".concat(hostname, "/").concat(fileName))), e);
        return false;
    }
    return true;
};
exports.writeFileSync = writeFileSync;
var updateFileSync = function (hostname, matchedPath, html) {
    if (!CACHE_ENABLE())
        return undefined;
    return (0, exports.writeFileSync)(hostname, matchedPath, html);
};
exports.updateFileSync = updateFileSync;
var existsSync = function (hostname, matchedPath) {
    var fileName = path2FileName(matchedPath);
    return fs.existsSync(path.resolve(pageDir, "".concat(hostname, "/").concat(fileName)));
};
exports.existsSync = existsSync;
