declare const module: any;

import { NestFactory } from '@nestjs/core';
import { UserCenterModule } from './user-center.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import fastify from 'fastify';
import * as cookieParser from 'cookie-parser';

import { generateDocument } from './doc'
import { FastifyLogger, catchError, AllExceptionsFilter, HttpExceptionFilter } from '@app/common';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

catchError()

async function bootstrap() {
  // 初始化 fastify 
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  })

  // 创建 NEST 实例
  const app = await NestFactory.create<NestFastifyApplication>(
    UserCenterModule,
    new FastifyAdapter(fastifyInstance)
  );

  // micro serivce
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: 4100,
        host: '0.0.0.0',
      },
    },
    {
      inheritAppConfig: true, // 继承 app 配置
    },
  );

  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 格式化 cookie
  app.use(cookieParser());

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 创建文档
  generateDocument(app)

  // 启动所有微服务
  await app.startAllMicroservices();

  // 启动服务
  await app.listen(4000);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
