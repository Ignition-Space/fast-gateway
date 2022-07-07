/*
 * @Author: hbh
 * @Date: 2022-01-06 17:17:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-24 20:58:20
 */
import { Page } from './page.mongo.entity';
import { PageConfig } from './page-config/page-config.mongo.entity';
import { DeployTestConfig } from './deploy-config/deploy-config.mongo.entity';

export const PageProviders = [
  {
    provide: 'PAGE_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Page),
    inject: ['MONGODB_CONNECTION'],
  },
  {
    provide: 'PAGE_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(PageConfig),
    inject: ['MONGODB_CONNECTION'],
  },
  {
    provide: 'DEPlOY_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(DeployTestConfig),
    inject: ['MONGODB_CONNECTION'],
  },
];
