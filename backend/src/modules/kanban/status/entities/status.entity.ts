import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../../lead/entities/lead.entity';
import { FollowUp } from '../../lead/follow-up/entities/follow-up.entity';

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  status_uid?: string;

  @Column({ nullable: true })
  status_description?: string;

  @Column({ nullable: true })
  status_uid_default?: string;

  @Column({ nullable: true })
  is_lead?: boolean;

  @Column({ nullable: true })
  is_follow_up?: boolean;

  /* A kanban can only have one business */
  @ManyToOne(() => Business, (business) => business.status, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* A status can have many list */
  @OneToMany(() => Lead, (lead) => lead.status)
  @JoinTable()
  lead?: Lead[];

  @OneToMany(() => FollowUp, (lead) => lead.status)
  @JoinTable()
  follow_up?: FollowUp[];

  /* Dates */
  @Column({ nullable: true })
  status_save_date?: Date;

  @Column({ nullable: true })
  status_update_date?: Date;

  @Column({ nullable: true })
  status_delete_date?: Date;

  @Column({ nullable: true })
  status_is_delete?: boolean;
}
