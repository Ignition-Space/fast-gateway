import { Body, Controller, Post, Version, VERSION_NEUTRAL, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuService } from './feishu.service';
import { FeishuMessageDto } from './feishu.dto';

@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) { }

  @ApiOperation({
    summary: '消息推送',
  })
  @Version([VERSION_NEUTRAL])
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params
    return this.feishuService.sendMessage(receive_id_type, rest);
  }
}