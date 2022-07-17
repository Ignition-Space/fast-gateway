/*
 * @Author: Cookie
 * @Description: 用户模块 dto
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class DisableUserDto {
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  status: number;
}

export class GetRolesByIdDto {

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  systemId: number;
}

export class SetRolesDto {

  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  roleIds: number[];

  @IsNotEmpty()
  systemId: number;
}

export class IToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  created_at: number;
}

export class GetUserListDto {
  @ApiProperty({ example: '卢' })
  keyword?: string;
}

export class GetPrivilegeListDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  systemId: number;
}

export class UserListWithPaginationDto {

  keyword?: string;

  creatorIds?: string[];

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}
