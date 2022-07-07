/*
 * @Author: Cookie
 * @Description: 开发异常捕获
 */

export const catchError = () => {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Promise: ', p, 'Reason: ', reason)
  })
}
