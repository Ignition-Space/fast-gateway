/*
 * @Author: Cookie
 * @Description: 
 */
import { IPaginationOptions, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { defaultPaginationParams, MAX_PAGE_SIZE } from './constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getPaginationOptions = (
  page: PaginationParams = {
    currentPage: defaultPaginationParams.currentPage,
    pageSize: defaultPaginationParams.pageSize,
  },
) => {
  const limit = page.pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : page.pageSize;

  const options: IPaginationOptions<CustomPaginationMeta> = {
    page: page.currentPage,
    limit,
    // 自定义 meta 信息
    metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta => {
      return new CustomPaginationMeta(
        meta.itemCount,
        meta.totalItems,
        meta.totalPages,
        meta.currentPage,
      );
    },
  };
  return options;
};

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);