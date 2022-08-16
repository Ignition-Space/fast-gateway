/*
 * @Author: Cookie
 * @Description: 日志导出类
 */

import { resolve, join } from 'path'

import { fastLogger } from './logger'

let logOpt = {
  console: process.env.NODE_ENV !== 'production', // 是否开启 console.log 
  level: 'info',
  serializers: { // 需要的额外数据
    req: (req) => {
      return {
        method: req.method,
        url: req.url
      }
    },
  },
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotator: { // 分割配置
    byHour: true,
    byDay: false,
    hourDelimiter: '_'
  }
}

export const FastifyLogger = (params) => {
  return fastLogger({
    ...logOpt,
    fileName: join(process.cwd(), `logs/${params.fileName}.log`), // 文件路径  
  })
}
