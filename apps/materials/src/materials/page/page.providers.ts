import { Page } from './page.mongo.entity';
import { PageConfig } from './pageConfig/pageConfig.mongo.entity';
import { DeployTestConfig } from './deployConfig/deployConfig.mongo.entity';

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
