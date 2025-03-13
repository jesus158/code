import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUp } from '../../entities/follow-up.entity';

@Entity('kanban_comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  comments_uid?: string;

  @Column({ nullable: true })
  comments_description?: string;

  @Column({ nullable: true })
  comments_user_uid_receive?: string;

  @Column({ nullable: true })
  comments_user_uid_send?: string;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  lead_uid?: string;

  follow_up_uid?: string;

  business_uid?: string;

  business_owner_uid?: string;

  db_access?: string;

  @ManyToOne(() => FollowUp, (follow_up) => follow_up.comments, {
    cascade: true,
  })
  @JoinTable()
  follow_up?: FollowUp;

  /* Dates */
  @Column({ nullable: true })
  comments_save_date?: Date;

  @Column({ nullable: true })
  comments_update_date?: Date;

  @Column({ nullable: true })
  comments_delete_date?: Date;

  @Column({ nullable: true })
  comments_is_delete?: boolean;
}
