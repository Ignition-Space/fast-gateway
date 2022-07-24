import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.mongo.entity';
import { FeishuUserInfo } from './feishu/feishu.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>
  ) { }

  createOrSave(user) {
    return this.userRepository.save(user)
  }

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    return await this.userRepository.save(feishuUserInfo);
  }

}