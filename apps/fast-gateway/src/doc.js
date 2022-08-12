"use strict";
/*
 * @Author: Cookie
 * @Description: 创建文档
 */
exports.__esModule = true;
exports.generateDocument = void 0;
var swagger_1 = require("@nestjs/swagger");
var packageConfig = require("../../../package.json");
var generateDocument = function (app) {
    var options = new swagger_1.DocumentBuilder()
        .setTitle('网关核心系统')
        .setDescription(packageConfig.description)
        .setVersion(packageConfig.version)
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/doc', app, document);
};
exports.generateDocument = generateDocument;
