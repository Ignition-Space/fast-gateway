import { Injectable, Inject } from '@nestjs/common';
import { MongoRepository, ObjectID } from 'typeorm';
import { MonorepoGroup } from './monorepoGroup.mongo.entity';

@Injectable()
export class MonorepoGroupService {
  constructor(
    @Inject('MONOREPO_GROUP_REPOSITORY')
    private groupRepository: MongoRepository<MonorepoGroup>,
  ) { }

  save(group) {
    return this.groupRepository.save(group)
  }

  findOne(id) {
    return this.groupRepository.findOne(id)
  }

  getList(params) {
    return this.groupRepository.find(params)
  }

  getListByParams(params) {
    return this.groupRepository.find({ where: { ...params } })
  }

  updateOne(id, params) {
    return this.groupRepository.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { ...params } },
      { upsert: true }
    )
  }

  getListByIds(ids) {
    return this.groupRepository.find({
      where: {
        _id: {
          $in: ids.map(id => new ObjectID(id))
        }
      }
    })
  }

  del(id) {
    this.groupRepository.delete(new ObjectID(id))
  }
}
