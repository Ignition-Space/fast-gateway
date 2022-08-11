import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectID,
  UpdateDateColumn
} from 'typeorm';

export enum MATERIAL_TYPE {
  'cdn' = 0,
  'npm' = 1,
  'code' = 2,
}

@Entity()
export class VirtualMaterial {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  zhName: string;

  @Column()
  usName: string;

  @Column()
  desc: string;

  @Column()
  groupId: string;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  @UpdateDateColumn()
  updateUser: string;

}
