import { CacheModule, Module } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor, getConfig } from '@app/common';
import { GroupModule } from './materials/group/group.module';
import { MaterialModule } from './materials/material/material.module';
import { ProjectModule } from './materials/project/project.module';
import { TaskModule } from './materials/task/task.module';
import * as redisStore from 'cache-manager-redis-store';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { MicroservicesModule } from './microservices/microservices.module';
import { PermissionGuard } from './auth/guards/permission.guard';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    MicroservicesModule,
    GroupModule,
    TaskModule,
    MaterialModule,
    ProjectModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class MaterialsModule { }
