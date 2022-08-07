import { Module } from '@nestjs/common';

import { IntercepterController } from './intercepter.controller';
import { IntercepterService } from './intercepter.service';

@Module({
  controllers: [IntercepterController],
  providers: [IntercepterService],
})

export class IntercepterModule { }
