import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sales_bot')
export class Salesbot {
  @PrimaryGeneratedColumn('uuid')
  salesbot_uid?: string;

  @Column({ nullable: true })
  salesbot_name?: string;

  @Column({ nullable: true })
  salesbot_triggers?: string;

  @Column({ nullable: true })
  salesbot_conversion_rate?: string;

  @Column({ nullable: true })
  salesbot_full_release?: string;

  @Column({ nullable: true })
  salesbot_active_sessions?: string;

  /* A salesbot can only have one business */
  @ManyToOne(() => Business, (business) => business.salesbot, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  salesbot_save_date?: Date;

  @Column({ nullable: true })
  salesbot_update_date?: Date;

  @Column({ nullable: true })
  salesbot_delete_date?: Date;

  @Column({ nullable: true })
  salesbot_is_delete?: boolean;
}
