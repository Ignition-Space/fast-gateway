import { Column, ObjectID, ObjectIdColumn, CreateDateColumn, Entity } from "typeorm";

// 物料内容表
@Entity()
export class DeployTestConfig {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: null })
  contain: string;

  @CreateDateColumn()
  createTime: string

  @Column()
  pageId: string
}
