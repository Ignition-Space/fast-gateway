import { ApiProperty } from "@nestjs/swagger"

export class CreatePageConfigDto {
  @ApiProperty({ example: '627f116093a7301b5e700254' })
  pageId: string

  @ApiProperty({ example: 'test' })
  contain: string
}



export class SearchPageConfigDto {
  @ApiProperty({ example: '627f116093a7301b5e700254' })
  pageId: string

  @ApiProperty({ example: 'test' })
  contain: string
}
