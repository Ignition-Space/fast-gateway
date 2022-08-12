"use strict";
/*
 * @Author: Cookie
 * @Description:
 */
exports.__esModule = true;
exports.getConfig = exports.getEnv = void 0;
var yaml_1 = require("yaml");
var path = require("path");
var fs = require("fs");
// 获取项目运行环境
var getEnv = function () {
    return process.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
// 读取项目配置
var getConfig = function (type) {
    var environment = (0, exports.getEnv)() || 'dev';
    var yamlPath = path.join(process.cwd(), "./.config/.".concat(environment, ".yaml"));
    var file = fs.readFileSync(yamlPath, 'utf8');
    var config = (0, yaml_1.parse)(file);
    if (type) {
        return config[type];
    }
    return config;
};
exports.getConfig = getConfig;
