import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUp } from '../../entities/follow-up.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  activities_uid?: string;

  @Column({ nullable: true })
  activities_description?: string;

  @Column({ nullable: true })
  activities_who_assigned?: string;

  @Column({ nullable: true })
  activities_assign_to?: string;

  @Column({ nullable: true })
  activities_is_active?: boolean;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  @ManyToOne(() => FollowUp, (follow_up) => follow_up.activity, {
    cascade: true,
  })
  @JoinTable()
  follow_up?: FollowUp;

  /* Dates */
  @Column({ nullable: true })
  activities_save_date?: Date;

  @Column({ nullable: true })
  activities_update_date?: Date;

  @Column({ nullable: true })
  activities_delete_date?: Date;

  @Column({ nullable: true })
  activities_is_delete?: boolean;
}
