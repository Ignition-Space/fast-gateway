import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { PageController } from './page.controller';
import { PageProviders } from './page.providers';
import { PageService } from './page.service';

import { PageConfigService } from './page-config/page-config.service';
import { PageConfigController } from './page-config/page-config.controller';
import { DeployConfigService } from './deploy-config/deploy-config.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        }
      },
    ]),
    DatabaseModule,
  ],
  controllers: [
    PageConfigController,
    PageController,
  ],
  providers: [
    PageConfigService,
    PageService,
    DeployConfigService,
    ...PageProviders,
  ],
  exports: [PageService, DeployConfigService]
})

export class PageModule { }
