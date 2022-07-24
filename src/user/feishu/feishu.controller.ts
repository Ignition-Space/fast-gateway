import { Body, Controller, Post, Version, VERSION_NEUTRAL, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuService } from './feishu.service';
import { FeishuMessageDto, GetUserTokenDto } from './feishu.dto';

@ApiTags('飞书')
@Controller({
  path: 'feishu',
  version: [VERSION_NEUTRAL]
})
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) { }

  @ApiOperation({
    summary: '消息推送',
  })
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params
    return this.feishuService.sendMessage(receive_id_type, rest);
  }

  @ApiOperation({
    summary: '获取用户凭证',
  })
  @Post('getUserToken')
  getUserToken(@Body() params: GetUserTokenDto) {
    const { code } = params
    return this.feishuService.getUserToken(code);
  }

}