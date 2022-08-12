"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getEmployeeTypeEnums = exports.getUserListByDepartmentId = exports.getSingleUserInfo = exports.getUserInfo = void 0;
var request_1 = require("@/utils/request");
var getUserInfo = function (user_token) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, request_1.methodV)({
                    url: "/authen/v1/user_info",
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer ".concat(user_token)
                    }
                })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
/**
 * 获取通信录单个用户信息
 * @param feishuUserId
 * @param user_token
 * @returns
 */
var getSingleUserInfo = function (feishuUserId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, request_1.methodV)({
                    url: "/contact/v3/users/".concat(feishuUserId),
                    method: 'GET',
                    query: {
                        user_id_type: 'user_id'
                    },
                    headers: {
                        Authorization: "Bearer ".concat(token)
                    }
                })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
exports.getSingleUserInfo = getSingleUserInfo;
/**
 * 获取用户列表
 * @param app_token
 * @returns
 */
var getUserListByDepartmentId = function (department_id, app_token) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, request_1.methodV)({
                    url: "https://open.feishu.cn/open-apis/contact/v3/users",
                    // url: `/contact/v3/users/find_by_department`,
                    method: 'GET',
                    query: {
                        department_id_type: 'department_id',
                        department_id: department_id,
                        page_size: 50
                    },
                    headers: {
                        Authorization: "Bearer ".concat(app_token)
                    }
                })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
exports.getUserListByDepartmentId = getUserListByDepartmentId;
var getEmployeeTypeEnums = function (_a) {
    var app_token = _a.app_token;
    return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, request_1.methodV)({
                        url: "/contact/v3/employee_type_enums",
                        method: 'GET',
                        query: {
                            page_token: 1,
                            page_size: 100
                        },
                        headers: {
                            Authorization: "Bearer ".concat(app_token)
                        }
                    })];
                case 1:
                    data = (_b.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.getEmployeeTypeEnums = getEmployeeTypeEnums;
