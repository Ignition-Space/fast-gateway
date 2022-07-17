import { Resource } from './resource.entity';

export const ResourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Resource),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
