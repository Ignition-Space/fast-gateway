import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { MaterialModule } from './material/material.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    GroupModule,
    TaskModule,
    MaterialModule,
    ProjectModule
  ],
})

export class materialsModule { }
