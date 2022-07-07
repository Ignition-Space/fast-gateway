import { Controller, Post, Body, Get, Res, Query, Inject } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { addPageDto, } from './page.dto';
import { PageService } from './page.service';
import { ConfigService } from '@nestjs/config';
import { PageConfigService } from './page-config/page-config.service';
import { DeployConfigService } from './deploy-config/deploy-config.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';


@ApiTags('页面属性配置')
@Controller('page')
export class PageController {

  constructor(
    private pageService: PageService,
    private configService: ConfigService,
    private pageConfigService: PageConfigService,
    private deployConfigService: DeployConfigService,
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) {
  }

  @Get('getMath')
  async getMath() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
  }

  @Post('save')
  async save(@Body() params: addPageDto) {
    const page = await this.pageService.save(params)
    return page;
  }

  @Get('list')
  async getList() {
    return this.pageService.findAll();
  }

  @Post('deploy')
  async deploy(@Body() params: addPageDto) {
    const { id } = params
    const page = await this.pageService.findOne(id)

    const pageConfig = await this.pageConfigService.findOne(page.currentConfigId)

    const deployConfig = await this.deployConfigService.create({
      pageId: String(page.id),
      contain: pageConfig.contain
    })

    return deployConfig;
  }

  @Post('getDetail')
  async getDetail(@Body() params: addPageDto) {
    const { id } = params
    const page = await this.pageService.findOne(id)

    const pageConfig = await this.pageConfigService.findOne(page.currentConfigId)
    const deployConfig = await this.deployConfigService.findOne(page.deployConfigId)

    return {
      ...page,
      pageConfig,
      deployConfig
    };
  }


  @Post('updateOne')
  async updateOne(@Body() params: addPageDto) {
    const { id, ...rest } = params
    const page = await this.pageService.updateOne(id, rest)
    return {
      ...page,
      ...rest
    };
  }
}

