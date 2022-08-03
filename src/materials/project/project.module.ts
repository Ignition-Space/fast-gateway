import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { projectProviders } from './project.providers';

import { DatabaseModule } from 'src/common/database/database.module';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...projectProviders,
    ProjectService,
  ],
  exports: [ProjectService],
})
export class ProjectModule { }
