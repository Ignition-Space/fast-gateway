import { Role } from './role.mysql.entity';

export const RoleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Role),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
