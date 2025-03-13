import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('preference')
export class Preference {
  @PrimaryGeneratedColumn('uuid')
  preferences_uid?: string;

  @Column({ nullable: true })
  preferences_activate_product_catalog?: Boolean;

  @Column({ nullable: true })
  preferences_direct_chat?: boolean;

  @Column({ nullable: true })
  preferences_title?: string;

  @Column({ nullable: true })
  preferences_time_zone?: string;

  @Column({ nullable: true })
  preferences_date_format?: string;

  @Column({ nullable: true })
  preferences_time_format?: string;

  @Column({ nullable: true })
  preferences_exchange_rate?: string;

  @Column({ nullable: true })
  preferences_contact_name_format?: string;

  @Column({ nullable: true })
  business_uid?: string;

  @Column({ nullable: true })
  db_access?: string;

  /* A preferences can only have one business */
  @ManyToOne(() => Business, (business) => business.preferences, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  preferences_save_date?: Date;

  @Column({ nullable: true })
  preferences_update_date?: Date;

  @Column({ nullable: true })
  preferences_delete_date?: Date;

  @Column({ nullable: true })
  preferences_is_delete?: boolean;
}
