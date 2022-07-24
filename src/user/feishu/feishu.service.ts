import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import {
  getAppToken,
  getUserAccessToken,
  getUserToken,
  refreshUserToken,
} from 'src/helper/feishu/auth';
import { Cache } from 'cache-manager';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { messages } from '@/helper/feishu/message';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY')
  }

  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        // token 有效期为 2 小时，在此期间调用该接口 token 不会改变。当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = response.app_access_token;
        this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
          ttl: response.expire - 60,
        });
      } else {
        throw new BusinessException('飞书调用异常')
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken()
    return messages(receive_id_type, params, app_token as string)
  }
}