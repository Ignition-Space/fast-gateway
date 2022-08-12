"use strict";
/*
 * @Author: Cookie
 * @Description:
 */
exports.__esModule = true;
exports.APP_SECRET = exports.APP_ID = void 0;
var utils_1 = require("@/utils");
var FEISHU_CONFIG = (0, utils_1.getConfig)().FEISHU_CONFIG;
exports.APP_ID = FEISHU_CONFIG.FEISHU_APP_ID;
exports.APP_SECRET = FEISHU_CONFIG.FEISHU_APP_SECRET;
