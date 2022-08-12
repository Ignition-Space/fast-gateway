"use strict";
exports.__esModule = true;
exports.getMatchedSync = exports.matchPath = exports.matchWebsite = void 0;
var matchWebsite = function (host, websites) {
    return websites[host];
};
exports.matchWebsite = matchWebsite;
/**
 * @description path = / 时 '/'.split('/') 等于 ['', ''], 需要处理成 ['']
 */
var splitPath = function (path) {
    if (!path) {
        return [];
    }
    else if (path === '/') {
        return [''];
    }
    else {
        return path.split('/');
    }
};
/**
 *
 * @param website WebSiteDataModel
 * @param path startWith / , eg: / , /goods , /goods/detail
 * @returns PageModelItem
 */
var matchPath = function (website, targetPath) {
    if (!website)
        return;
    var targetPathArr = splitPath(targetPath);
    if (targetPathArr.find(function (i) { return i === '*'; })) {
        throw new Error('[matchPath] website custome path include *, redirect to 404');
    }
    // 全匹配
    if (website[targetPath]) {
        return {
            path: targetPath,
            data: website[targetPath]
        };
    }
    // .html 后缀 且 不等于 index.html,
    if (/\/[^\/]+\.html$/.test(targetPath) && !/\/index\.html/.test(targetPath)) {
        return {
            path: targetPath,
            data: website[targetPath]
        };
    }
    // 通配
    var matchLen = 0;
    var resultKey;
    Object.keys(website || {}).forEach(function (path) {
        if (!path.startsWith('/'))
            path = "/".concat(path);
        var pathArr = splitPath(path);
        // 非必须容错：仅允许最后一个字符出现 *
        if (pathArr.slice(0, -1).find(function (i) { return i === '*'; }))
            throw new Error('[matchPath] path include *');
        /**
         * 遍历路由规则列表，匹配命中立即停止遍历
         */
        var currentMatchLen = 0;
        var currentResultKey;
        for (var i = 0; i < pathArr.length; i += 1) {
            if (targetPathArr[i] !== pathArr[i]) {
                currentMatchLen = 0;
                currentResultKey = undefined;
                return;
            }
            else if (undefined === targetPathArr[i]) {
                currentMatchLen = 0;
                currentResultKey = undefined;
                return;
            }
            currentMatchLen = i + 1;
            currentResultKey = path;
        }
        if (matchLen < currentMatchLen) {
            matchLen = currentMatchLen;
            resultKey = currentResultKey;
        }
    });
    return {
        path: resultKey,
        data: website[resultKey]
    };
};
exports.matchPath = matchPath;
var getMatchedSync = function (urlObj, websites) {
    if (websites === void 0) { websites = {}; }
    if (!urlObj.hostname) {
        return undefined;
    }
    var website = (0, exports.matchWebsite)(urlObj.hostname, websites);
    if (!website) {
        return undefined;
    }
    var _a = (0, exports.matchPath)(website, urlObj.pathname), data = _a.data, path = _a.path;
    if (!data) {
        return { path: undefined, data: undefined };
    }
    return { data: data, path: path };
};
exports.getMatchedSync = getMatchedSync;
