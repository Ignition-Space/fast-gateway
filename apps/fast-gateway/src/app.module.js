"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var config_1 = require("@nestjs/config");
var common_2 = require("@app/common");
var redisStore = require("cache-manager-redis-store");
var utils_1 = require("./utils");
var intercepter_module_1 = require("./core/intercepter.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                common_1.CacheModule.register({
                    isGlobal: true,
                    store: redisStore,
                    host: (0, utils_1.getConfig)('REDIS_CONFIG').host,
                    port: (0, utils_1.getConfig)('REDIS_CONFIG').port,
                    auth_pass: (0, utils_1.getConfig)('REDIS_CONFIG').auth,
                    db: (0, utils_1.getConfig)('REDIS_CONFIG').db
                }),
                config_1.ConfigModule.forRoot({
                    ignoreEnvFile: true,
                    isGlobal: true,
                    load: [utils_1.getConfig]
                }),
                intercepter_module_1.IntercepterModule
            ],
            providers: [
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: common_2.TransformInterceptor
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
