import { CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import * as redisStore from 'cache-manager-redis-store';

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
    }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
