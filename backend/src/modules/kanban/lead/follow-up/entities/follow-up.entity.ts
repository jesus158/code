import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Lead } from '../../entities/lead.entity';
import { Activity } from '../activities/entities/activity.entity';
import { Checks } from '../checks/entities/check.entity';
import { Comments } from '../comments/entities/comment.entity';
import { Files } from '../files/entities/file.entity';
import { Timeline } from '../timeline/entities/timeline.entity';
import { Status } from 'src/modules/kanban/status/entities/status.entity';

@Entity('follow_up')
export class FollowUp {
  @PrimaryGeneratedColumn('uuid')
  follow_up_uid?: string;

  @Column({ nullable: true })
  follow_up_code_generated?: string;

  @Column({ nullable: true })
  follow_up_number_generated?: number;

  lead_uid?: string;

  /* A follow up can only have one kanban list */
  @ManyToOne(() => Lead, (lead) => lead.follow_up, {
    cascade: true,
  })
  @JoinTable()
  lead?: Lead;

  @ManyToOne(() => Status, (status) => status.follow_up, {
    cascade: true,
  })
  @JoinTable()
  status?: Status;

  /* A lead can have many activities */
  @OneToMany(() => Activity, (activities) => activities.follow_up)
  @JoinTable()
  activity?: Activity[];

  /* A lead can have many check lead */
  @OneToMany(() => Checks, (checks) => checks.follow_up)
  @JoinTable()
  checks?: Checks[];

  /* A lead can have many comments */
  @OneToMany(() => Comments, (comments) => comments.follow_up)
  @JoinTable()
  comments?: Comments[];

  /* A lead can have many files */
  @OneToMany(() => Files, (file) => file.follow_up)
  @JoinTable()
  file?: Files[];

  /* A lead can have many timeline */
  @OneToMany(() => Timeline, (timeline) => timeline.follow_up)
  @JoinTable()
  timeline?: Timeline[];

  /* Dates */
  @Column({ nullable: true })
  follow_up_save_date?: Date;

  @Column({ nullable: true })
  follow_up_update_date?: Date;

  @Column({ nullable: true })
  follow_up_delete_date?: Date;

  @Column({ nullable: true })
  follow_up_is_delete?: boolean;
}
