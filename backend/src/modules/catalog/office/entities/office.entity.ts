import { Business } from 'src/modules/business/entities/business.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity('office')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  office_uid?: string;

  @Column({ nullable: true })
  office_name?: string;

  @Column({ nullable: true })
  office_number?: string;

  @Column({ nullable: true })
  office_manager?: string;

  @Column({ nullable: true })
  office_location?: string;

  @Column({ nullable: true })
  office_observations?: string;

  @ManyToOne(() => Business, (business) => business.office, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  office_save_date?: Date;

  @Column({ nullable: true })
  office_update_date?: Date;

  @Column({ nullable: true })
  office_delete_date?: Date;

  @Column({ nullable: true })
  office_is_delete?: boolean;
}
