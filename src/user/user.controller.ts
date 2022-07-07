/*
 * @Author: Cookie
 * @Description: 
 */
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayloadUser } from '@/helper';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ApiOperation({
    summary: '用户信息',
  })
  @Post('/profile')
  profile(@PayloadUser() user: Payload) {
    return this.userService.profile(user.userId);
  }

}
