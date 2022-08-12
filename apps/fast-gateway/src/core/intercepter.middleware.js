"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IntercepterMiddleware = void 0;
var common_1 = require("@nestjs/common");
var IntercepterMiddleware = /** @class */ (function () {
    function IntercepterMiddleware() {
    }
    IntercepterMiddleware.prototype.use = function (req, res, next) {
        var host = req.headers.host;
        var urlObj = new URL(req.url, "http://".concat(req.headers.host));
        next();
    };
    IntercepterMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], IntercepterMiddleware);
    return IntercepterMiddleware;
}());
exports.IntercepterMiddleware = IntercepterMiddleware;
