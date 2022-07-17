/*
 * @Author: hbh
 * @Date: 2022-01-06 17:17:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-17 19:42:27
 */
import { Page } from './page.mongo.entity';
import { PageConfig } from './page-config/page-config.mongo.entity';
import { DeployTestConfig } from './deploy-config/deploy-config.mongo.entity';

export const PageProviders = [
  {
    provide: 'PAGE_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Page),
    inject: ['MONGODB_DATA_SOURCE'],
  },
  {
    provide: 'PAGE_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(PageConfig),
    inject: ['MONGODB_DATA_SOURCE'],
  },
  {
    provide: 'DEPlOY_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(DeployTestConfig),
    inject: ['MONGODB_DATA_SOURCE'],
  },
];
