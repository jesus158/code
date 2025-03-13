import { User } from 'src/modules/configuration/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notifications_uid?: string;

  @Column({ nullable: true })
  notifications_description?: string;

  db_access?: string;

  business_uid?: string;

  user_send_uid?: string;

  user_receive_uid?: string;

  /* A notification can have many permission */
  @ManyToOne(() => User, (user) => user.notification_send)
  @JoinTable()
  user_send?: User;

  /* A notification can have many permission */
  @ManyToOne(() => User, (user) => user.notification_receive)
  @JoinTable()
  user_receive?: User;

  /* Dates */
  @Column({ nullable: true })
  notifications_save_date?: Date;

  @Column({ nullable: true })
  notifications_update_date?: Date;

  @Column({ nullable: true })
  notifications_delete_date?: Date;

  @Column({ nullable: true })
  notifications_is_delete?: boolean;
}
