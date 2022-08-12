"use strict";
exports.__esModule = true;
exports.PayloadUser = exports.getPaginationOptions = exports.CustomPaginationMeta = void 0;
var constants_1 = require("./constants");
var common_1 = require("@nestjs/common");
var CustomPaginationMeta = /** @class */ (function () {
    function CustomPaginationMeta(pageSize, totalCounts, totalPages, currentPage) {
        this.pageSize = pageSize;
        this.totalCounts = totalCounts;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
    return CustomPaginationMeta;
}());
exports.CustomPaginationMeta = CustomPaginationMeta;
var getPaginationOptions = function (page) {
    if (page === void 0) { page = {
        currentPage: constants_1.defaultPaginationParams.currentPage,
        pageSize: constants_1.defaultPaginationParams.pageSize
    }; }
    var limit = page.pageSize > constants_1.MAX_PAGE_SIZE ? constants_1.MAX_PAGE_SIZE : page.pageSize;
    var options = {
        page: page.currentPage,
        limit: limit,
        metaTransformer: function (meta) {
            return new CustomPaginationMeta(meta.itemCount, meta.totalItems, meta.totalPages, meta.currentPage);
        }
    };
    return options;
};
exports.getPaginationOptions = getPaginationOptions;
exports.PayloadUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
