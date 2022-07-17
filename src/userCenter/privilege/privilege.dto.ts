import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Action } from "rxjs/internal/scheduler/Action";
import { PaginationParams } from "types/type";

export class CreatePrivilegeDto {

  @ApiProperty({ example: '2', description: '系统id' })
  @IsNotEmpty()
  systemId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '查看', description: '权限名称' })
  name: string;

  @ApiProperty({ example: 'page', description: '类型' })
  @IsNotEmpty()
  resourceKey: string;

  @ApiProperty({ example: '查看', description: '权限描述' })
  description?: string;

  @ApiProperty({ example: 'read', enum: Action })
  @IsNotEmpty()
  action: string;

}

export class DeletePrivilegeDto {
  @IsNotEmpty()
  privilegeId: number;
}

export class DisablePrivilegeDto {
  @IsNotEmpty()
  privilegeId: number;
  @IsNotEmpty()
  status: number;
}

export class UpdatePrivilegeDto {

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id: number;

  @IsNotEmpty()
  systemId: number;

  @ApiProperty({ example: '项目发布' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '用于项目的发布权限' })
  description: string;

  @ApiProperty({ example: 'project' })
  @IsNotEmpty()
  resourceKey: string;

  @ApiProperty({ example: 'publish' })
  @IsNotEmpty()
  action: string;
}


export class PrivilegeListWithPaginationDto {
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}

export class ListAllPrivilegeDto {
  @IsNotEmpty()
  systemId: number;
}
