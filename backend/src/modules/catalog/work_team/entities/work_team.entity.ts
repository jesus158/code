import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('work_team')
export class WorkTeam {
  @PrimaryGeneratedColumn('uuid')
  work_team_uid?: string;

  @Column({ nullable: true })
  work_team_name?: string;

  @Column({ nullable: true })
  work_team_description?: string;

  @ManyToOne(() => Business, (business) => business.workteam, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  work_team_save_date?: Date;

  @Column({ nullable: true })
  work_team_update_date?: Date;

  @Column({ nullable: true })
  work_team_delete_date?: Date;

  @Column({ nullable: true })
  work_team_is_delete?: boolean;
}
