import { Privilege } from './privilege.mysql.entity';

export const PrivilegeProviders = [
  {
    provide: 'PRIVILEGE_REPOSITORY',
    useFactory: async (AppDataSource) => await AppDataSource.getRepository(Privilege),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
