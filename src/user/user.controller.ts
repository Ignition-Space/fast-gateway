import { Controller, Post, Body, Query, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller({
  path: 'user',
  version: [VERSION_NEUTRAL]
})
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }
}