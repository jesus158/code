import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Access } from './access.entity';

@Entity('access_user')
export class AccessUser {
  @PrimaryGeneratedColumn('uuid')
  access_user_uid?: string;

  /* The email I need to perform a search and verify if the user exists */
  @Column({ nullable: true })
  access_user_email?: string;

  /* to get the data from the front end */
  @Column({ nullable: true })
  access_user_username?: string;

  @ManyToOne(() => Access, (access) => access.access_user, {
    cascade: true,
  })
  @JoinTable()
  access?: Access;

  /* Dates */
  @Column({ nullable: true })
  access_user_save_date?: Date;

  @Column({ nullable: true })
  access_user_update_date?: Date;

  @Column({ nullable: true })
  access_user_delete_date?: Date;

  @Column({ nullable: true })
  access_user_is_delete?: boolean;
}
