/*
 * @Author: Cookie
 * @Description: 日志基础类，包含控制台打印
 */

const chalk = require('chalk')
const dayjs = require('dayjs')
const split = require('split2')
const JSONparse = require('fast-json-parse')

const levels = {
  [60]: 'Fatal',
  [50]: 'Error',
  [40]: 'Warn',
  [30]: 'Info',
  [20]: 'Debug',
  [10]: 'Trace'
};

const colors = {
  [60]: 'magenta',
  [50]: 'red',
  [40]: 'yellow',
  [30]: 'blue',
  [20]: 'white',
  [10]: 'white'
}

interface ILogStream {
  format?: () => void
}

export class LogStream {
  public trans;
  private customFormat;

  constructor(opt?: ILogStream) {
    this.trans = split((data) => {
      this.log(data);
    });

    if (opt?.format && typeof opt.format === 'function') {
      this.customFormat = opt.format
    }
  }

  log(data) {
    data = this.jsonParse(data)
    const level = data.level
    data = this.format(data)
    console.log(chalk[colors[level]](data))
  }

  jsonParse(data) {
    return JSONparse(data).value;
  }

  format(data) {

    if (this.customFormat) {
      return this.customFormat(data)
    }

    const Level = levels[data.level];
    const DateTime = dayjs(data.time).format('YYYY-MM-DD HH:mm:ss.SSS A');
    const logId = data.reqId || '_logId_';

    let reqInfo = '[-]';

    if (data.req) {
      reqInfo = `[${data.req.remoteAddress || ""} - ${data.req.method} - ${data.req.url}]`
    }

    if (data.res) {
      reqInfo = JSON.stringify(data.res)
    }

    // 过滤 swagger 日志
    if (data?.req?.url && data?.req?.url.indexOf('/api/doc') !== -1) {
      return null
    }
    return `${Level} | ${DateTime} | ${logId} | ${reqInfo} | ${data.stack || data.msg}`
  }

}