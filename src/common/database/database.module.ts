/*
 * @Author: Cookie
 * @Description: 
 */

import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
import { parse, stringify } from 'yaml'

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})

export class DatabaseModule { }
