import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaginationParams } from "types/type";

export class CreateResourceDto {
  @IsNotEmpty()
  name: string;

  parentId?: number;

  @IsNotEmpty()
  systemId: number;

  key: string;
}

export class ListBySystemIdDto {
  @IsNotEmpty()
  systemId: number;
}

export class DeleteResourceDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateResourceDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name?: string;
}


export class ResourceListWithPaginationDto {
  keyword?: string;


  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}