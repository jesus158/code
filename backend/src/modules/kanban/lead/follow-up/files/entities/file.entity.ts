import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FollowUp } from '../../entities/follow-up.entity';

@Entity('kanban_files')
export class Files {
  @PrimaryGeneratedColumn('uuid')
  files_uid?: string;

  @Column({ nullable: true })
  files_name?: string;

  @Column({ nullable: true })
  files_type?: string;

  @Column({ nullable: true })
  files_url?: string;

  @Column({ nullable: true })
  files_url_default?: string;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  @ManyToOne(() => FollowUp, (follow_up) => follow_up.file, {
    cascade: true,
  })
  @JoinTable()
  follow_up?: FollowUp;

  /* Dates */
  @Column({ nullable: true })
  files_save_date?: Date;

  @Column({ nullable: true })
  files_update_date?: Date;

  @Column({ nullable: true })
  files_delete_date?: Date;

  @Column({ nullable: true })
  files_is_delete?: boolean;
}
