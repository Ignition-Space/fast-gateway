"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IntercepterModule = void 0;
var common_1 = require("@nestjs/common");
var intercepter_controller_1 = require("./intercepter.controller");
var intercepter_service_1 = require("./intercepter.service");
var IntercepterModule = /** @class */ (function () {
    function IntercepterModule() {
    }
    IntercepterModule = __decorate([
        (0, common_1.Module)({
            controllers: [intercepter_controller_1.IntercepterController],
            providers: [intercepter_service_1.IntercepterService]
        })
    ], IntercepterModule);
    return IntercepterModule;
}());
exports.IntercepterModule = IntercepterModule;
