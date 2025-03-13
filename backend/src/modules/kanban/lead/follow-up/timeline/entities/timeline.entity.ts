import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUp } from '../../entities/follow-up.entity';

@Entity('kanban_timelines')
export class Timeline {
  @PrimaryGeneratedColumn('uuid')
  timelines_uid?: string;

  @Column({ nullable: true })
  timelines_description?: string;

  @Column({ nullable: true })
  timelines_is_complete?: boolean;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  @ManyToOne(() => FollowUp, (follow_up) => follow_up.timeline, {
    cascade: true,
  })
  @JoinTable()
  follow_up?: FollowUp;

  /* Dates */
  @Column({ nullable: true })
  timelines_save_date?: Date;

  @Column({ nullable: true })
  timelines_update_date?: Date;

  @Column({ nullable: true })
  timelines_delete_date?: Date;

  @Column({ nullable: true })
  timelines_is_delete?: boolean;
}
