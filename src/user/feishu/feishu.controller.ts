import { Body, Controller, Post, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayloadUser } from '@/helper';
import { FeishuService } from './feishu.service';
import { FeishuMessageDto } from './feishu.dto';
import { Public } from '@/auth/constants';


@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) { }

  @ApiOperation({
    summary: '获取通信录单个用户信息',
  })
  @Post('getSingleUserInfo')
  getSingleUserInfo(@PayloadUser() user: Payload) {
    return this.feishuService.getSingleUserInfo(user.feishuUserId);
  }

  @Public()
  @ApiOperation({
    summary: '消息推送',
  })
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params
    return this.feishuService.sendMessage(receive_id_type, rest);
  }
}
