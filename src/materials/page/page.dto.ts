/*
 * @Author: hbh
 * @Date: 2021-12-31 13:59:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-23 20:32:55
 */
import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';
import { IsNotEmpty } from 'class-validator';
import { DEVICE_TYPE, PAGE_TYPE } from './page.mongo.entity';

export class addPageDto {
  @ApiProperty({ example: '6263f15f6d160033b35061d7' })
  id?: string;

  @ApiProperty({ example: '/home' })
  @IsNotEmpty()
  path: string;

  @ApiProperty({ example: 'website' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: PAGE_TYPE.csr, enum: PAGE_TYPE })
  @IsNotEmpty()
  type: PAGE_TYPE;

  @ApiProperty({ example: DEVICE_TYPE.pc, enum: DEVICE_TYPE })
  @IsNotEmpty()
  device: DEVICE_TYPE;
}
