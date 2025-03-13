import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUp } from '../../entities/follow-up.entity';

@Entity('kanban_checks')
export class Checks {
  @PrimaryGeneratedColumn('uuid')
  checks_uid?: string;

  @Column({ nullable: true })
  checks_description?: string;

  @Column({ nullable: true })
  checks_is_active?: boolean;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  @ManyToOne(() => FollowUp, (follow_up) => follow_up.checks, {
    cascade: true,
  })
  @JoinTable()
  follow_up?: FollowUp;

  /* Dates */
  @Column({ nullable: true })
  checks_save_date?: Date;

  @Column({ nullable: true })
  checks_update_date?: Date;

  @Column({ nullable: true })
  checks_delete_date?: Date;

  @Column({ nullable: true })
  checks_is_delete?: boolean;
}
