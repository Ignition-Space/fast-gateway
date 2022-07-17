import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { RolePrivilegeService } from './role-privilege.service';
import { rolePrivilegeProviders } from './user-privilege.providers';

@Module({
  providers: [RolePrivilegeService, ...rolePrivilegeProviders],
  imports: [DatabaseModule],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule { }
