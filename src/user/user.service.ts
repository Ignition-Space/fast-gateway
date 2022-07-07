import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from './user.mongo.entity';
import { FeishuUserInfo } from 'src/user/feishu/feishu.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { FeishuService } from 'src/user/feishu/feishu.service';

const _ = require('lodash');

type SyncUserInfo = {
  name: string;
  email: string;
  username: string;
  gitUserId: number;
};

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
    private readonly feishuService: FeishuService
  ) { }

  createOrSave(user: User) {
    this.userRepository.save(user)
  }

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    return await this.userRepository.save(feishuUserInfo);
  }

  profile(userId: number) {
    // return this.userRepository.findOne(userId);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
  getUserByFeishuId(feishuUserId: string) {
    return this.userRepository.findOne({
      where: {
        feishuUserId
      }
    });
  }
}
