import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { DeployTestConfig } from './deployConfig.mongo.entity';
import { PageService } from '../page.service';

@Injectable()
export class DeployConfigService {
  constructor(
    @Inject('DEPlOY_CONFIG_REPOSITORY')
    private deployConfigRepository: MongoRepository<DeployTestConfig>,
    private pageService: PageService,
  ) { }

  async create(createPageConfigDto) {
    const { pageId } = createPageConfigDto
    const deployConfig = await this.deployConfigRepository.save(createPageConfigDto)
    this.pageService.updateOne(pageId, {
      deployConfigId: deployConfig.id
    })
    return deployConfig;
  }

  findOne(id) {
    return this.deployConfigRepository.findOne(id)
  }

}
