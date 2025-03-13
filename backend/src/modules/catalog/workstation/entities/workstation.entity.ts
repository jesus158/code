import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('workstation')
export class Workstation {
  @PrimaryGeneratedColumn('uuid')
  workstation_uid?: string;

  @Column({ nullable: true })
  workstation_description?: string;

  @ManyToOne(() => Business, (business) => business.workstation, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  @OneToMany(() => Staff, (staff) => staff.workstation)
  @JoinTable()
  staff?: Staff[];

  /* Dates */
  @Column({ nullable: true })
  workstation_save_date?: Date;

  @Column({ nullable: true })
  workstation_update_date?: Date;

  @Column({ nullable: true })
  workstation_delete_date?: Date;

  @Column({ nullable: true })
  workstation_is_delete?: boolean;
}
