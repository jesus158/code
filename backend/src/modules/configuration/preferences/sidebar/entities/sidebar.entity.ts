import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from 'src/modules/configuration/user/entities/user.entity';

@Entity('sidebar')
export class Sidebar {
  @PrimaryGeneratedColumn('uuid')
  sidebar_uid?: string;

  @Column({ nullable: true })
  sidebar_name?: string;

  @Column({ nullable: true })
  sidebar_uid_default?: string;

  /* A sidebar can only have one user */
  @ManyToOne(() => User, (user) => user.sidebar, {
    cascade: true,
  })
  @JoinTable()
  user?: User;

  /* Dates */
  @Column({ nullable: true })
  sidebar_save_date?: Date;

  @Column({ nullable: true })
  sidebar_update_date?: Date;

  @Column({ nullable: true })
  sidebar_delete_date?: Date;

  @Column({ nullable: true })
  sidebar_is_delete?: boolean;
}
