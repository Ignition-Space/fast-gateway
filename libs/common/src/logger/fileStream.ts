/*
 * @Author: Cookie
 * @Description: 日志缓存文件类
 */

import { dirname } from 'path'
import { createWriteStream, stat, rename } from 'fs'

const assert = require("assert")
const mkdirp = require("mkdirp")

import { LogStream } from "./logStream"

const defaultOptions = {
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotator: {
    byHour: true,
    byDay: false,
    hourDelimiter: '_'
  }
}

const onError = (err) => {
  console.error(
    '%s ERROR %s [chair-logger:buffer_write_stream] %s: %s\n%s',
    new Date().toString(),
    process.pid,
    err.name,
    err.message,
    err.stack
  )
}

const fileExists = async (srcPath) => {
  return new Promise((resolve, reject) => {
    // 自运行返回Promise
    stat(srcPath, (err, stats) => {
      if (!err && stats.isFile()) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  })
}

const fileRename = async (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    rename(oldPath, newPath, (e) => {
      resolve(e ? false : true);
    })
  })
}

export class FileStream extends LogStream {
  private options: any = {};
  private _stream = null;
  private _timer = null;
  private _bufSize = 0;
  private _buf = [];
  private lastPlusName = '';
  private _RotateTimer = null;

  constructor(options) {
    super(options)
    assert(options.fileName, 'should pass options.fileName')
    this.options = Object.assign({}, defaultOptions, options)
    this._stream = null
    this._timer = null
    this._bufSize = 0
    this._buf = []
    this.lastPlusName = this._getPlusName();
    this.reload()
    this._RotateTimer = this._createRotateInterval();
  }

  log(data) {
    data = this.format(this.jsonParse(data))
    if (data) this._write(data + '\n')
  }

  /**
   * 重新载入日志文件
   */
  reload() {
    // 关闭原来的 stream
    this.close()
    // 新创建一个 stream
    this._stream = this._createStream()
    this._timer = this._createInterval()
  }

  reloadStream() {
    this._closeStream()
    this._stream = this._createStream()
  }
  /**
   * 关闭 stream
   */
  close() {
    this._closeInterval() // 关闭定时器
    if (this._buf && this._buf.length > 0) {
      // 写入剩余内容
      this.flush()
    }
    this._closeStream() //关闭流
  }

  /**
   * @deprecated
   */
  end() {
    console.log('transport.end() is deprecated, use transport.close()')
    this.close()
  }

  /**
   * 覆盖父类，写入内存
   * @param {Buffer} buf - 日志内容
   * @private
   */
  _write(buf) {
    this._bufSize += buf.length
    this._buf.push(buf)
    if (this._buf.length > this.options.maxBufferLength) {
      this.flush()
    }
  }

  /**
   * 创建一个 stream
   * @return {Stream} 返回一个 writeStream
   * @private
   */
  _createStream() {
    mkdirp.sync(dirname(this.options.fileName))
    const stream = createWriteStream(this.options.fileName, { flags: 'a' })
    stream.on('error', onError)
    return stream
  }

  /**
   * 关闭 stream
   * @private
   */
  _closeStream() {
    if (this._stream) {
      this._stream.end()
      this._stream.removeListener('error', onError)
      this._stream = null
    }
  }

  /**
   * 将内存中的字符写入文件中
   */
  flush() {
    if (this._buf.length > 0) {
      this._stream.write(this._buf.join(''))
      this._buf = []
      this._bufSize = 0
    }
  }

  /**
   * 创建定时器，一定时间内写入文件
   * @return {Interval} 定时器
   * @private
   */
  _createInterval() {
    return setInterval(() => {
      this.flush()
    }, this.options.flushInterval)
  }

  /**
   * 关闭定时器
   * @private
   */
  _closeInterval() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  /**
   * 分割定时器
   * @private
   */
  _createRotateInterval() {
    return setInterval(() => {
      this._checkRotate()
    }, 1000)
  }

  /**
   * 检测日志分割
   */
  _checkRotate() {
    let flag = false

    const plusName = this._getPlusName()
    if (plusName === this.lastPlusName) {
      return
    }
    this.lastPlusName = plusName;
    this.renameOrDelete(this.options.fileName, this.options.fileName + plusName)
      .then(() => {
        this.reloadStream()
      })
      .catch(e => {
        console.log(e)
        this.reloadStream()
      })
  }

  _getPlusName() {
    let plusName
    const date = new Date()
    if (this.options.logRotator.byHour) {
      plusName = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}${this.options.logRotator.hourDelimiter}${date.getHours()}`
    } else {
      plusName = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`
    }
    return `.${plusName}`;
  }

  /**
   * 重命名文件
   * @param {*} srcPath 
   * @param {*} targetPath 
   */
  async renameOrDelete(srcPath, targetPath) {
    if (srcPath === targetPath) {
      return
    }
    const srcExists = await fileExists(srcPath);
    if (!srcExists) {
      return
    }
    const targetExists = await fileExists(targetPath)

    if (targetExists) {
      console.log(`targetFile ${targetPath} exists!!!`)
      return
    }
    await fileRename(srcPath, targetPath)
  }

}
