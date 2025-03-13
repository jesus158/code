import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Workstation } from '../../workstation/entities/workstation.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staff_uid?: string;

  @Column({ nullable: true })
  staff_name?: string;

  @Column({ nullable: true })
  staff_last_name?: string;

  @Column({ nullable: true })
  staff_email?: string;

  @Column({ nullable: true })
  staff_number_phone?: string;

  @Column({ nullable: true })
  staff_address?: string;

  @Column({ nullable: true })
  staff_experience?: string;

  @Column({ nullable: true })
  staff_department?: string;

  @Column({ nullable: true })
  staff_age?: number;

  @Column({ nullable: true })
  staff_birthday?: Date;

  @ManyToOne(() => Business, (business) => business.staff, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  @ManyToOne(() => Workstation, (workstation) => workstation.staff, {
    cascade: true,
  })
  @JoinTable()
  workstation?: Workstation;

  /* Dates */
  @Column({ nullable: true })
  staff_save_date?: Date;

  @Column({ nullable: true })
  staff_update_date?: Date;

  @Column({ nullable: true })
  staff_delete_date?: Date;

  @Column({ nullable: true })
  staff_is_delete?: boolean;
}
