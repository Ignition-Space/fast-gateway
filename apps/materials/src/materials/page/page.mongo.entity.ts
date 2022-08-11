import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  ObjectID,
  UpdateDateColumn,
} from 'typeorm';

export enum PAGE_TYPE {
  'csr' = 0,
  'ssr' = 1,
}

export enum DEVICE_TYPE {
  'pc' = 0,
  'mobile' = 1,
  'weapp' = 2,
}

export enum STATUS_TYPE {
  'activated' = 0,
  'inactive' = 1,
  'deleted' = 2,
}

@Entity()
export class Page {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: null })
  path: string;

  @Column()
  name: string;

  @Column({ default: null })
  currentConfigId: string;

  @Column({ default: null })
  deployConfigId: string;

  @Column({ default: null })
  currentVersion: string;

  @Column({ default: null })
  deployVersion: string;

  @Column()
  templateId: string;

  // 页面渲染类型
  @Column()
  type: PAGE_TYPE;

  // 设备类型
  @Column()
  device: DEVICE_TYPE;

  // site 状态
  @Column({ default: STATUS_TYPE.inactive })
  status: STATUS_TYPE;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  @UpdateDateColumn({ default: null })
  appointmentUp: string;

  @UpdateDateColumn({ default: null })
  appointmentDown: string;
}
