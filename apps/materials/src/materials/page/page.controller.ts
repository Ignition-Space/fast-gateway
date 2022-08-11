import { Controller, Post, Body, Get, Inject, } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { addPageDto, } from './page.dto';
import { PageService } from './page.service';
import { ConfigService } from '@nestjs/config';
import { PageConfigService } from './pageConfig/pageConfig.service';
import { DeployConfigService } from './deployConfig/deployConfig.service';
import { ClientProxy } from '@nestjs/microservices';
import { join } from 'path';
import { Public } from '@app/common';
const log = require('pino')({ level: 'info' })

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

  @Post('save')
  async save(@Body() params: addPageDto) {
    const page = await this.pageService.saveAndUpdate(params)
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

  @Public()
  @Post('getData')
  async getData() {
    log.info('Doing something with package.json');

    return {
      filePath: join(process.cwd(), 'package.json')
    }
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

