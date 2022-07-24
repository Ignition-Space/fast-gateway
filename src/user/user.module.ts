import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';

@Module({
  controllers: [
    FeishuController
  ],
  providers: [FeishuService],
})
export class UserModule { }