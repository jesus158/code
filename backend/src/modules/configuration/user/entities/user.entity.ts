import { BusinessOwner } from 'src/modules/business_owner/entities/business_owner.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sidebar } from '../../preferences/sidebar/entities/sidebar.entity';
import { Business } from 'src/modules/business/entities/business.entity';
import { Permissions_Module } from 'src/modules/main_modules/permissions_modules/entities/permissions_module.entity';
import { Permission } from 'src/modules/main_modules/permissions/entities/permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_uid?: string;

  @Column({ nullable: true })
  user_name?: string;

  @Column({ nullable: true })
  user_group?: string;

  @Column({ nullable: true })
  user_email?: string;

  @Column({ nullable: true })
  user_username?: string;

  @Column({ nullable: true })
  user_password?: string;

  @Column({ nullable: true })
  user_lead?: string;

  @Column({ nullable: true })
  user_contact?: string;

  @Column({ nullable: true })
  user_company?: string;

  @Column({ nullable: true })
  user_task?: string;

  @Column({ nullable: true })
  user_status?: string;

  /* For when the owner selects the sidebar permissions */
  @Column({ nullable: true })
  is_custom_sidebar?: boolean;

  @ManyToOne(() => BusinessOwner, (business_owner) => business_owner.users, {
    cascade: true,
  })
  @JoinTable()
  business_owner?: BusinessOwner;

  /* A user can have many permission */
  @OneToMany(() => Permission, (permission) => permission.user)
  @JoinTable()
  permissions?: Permission[];

  /* A user can have many permission module */
  @OneToMany(
    () => Permissions_Module,
    (permissions_module) => permissions_module.user,
  )
  @JoinTable()
  permissions_module?: Permissions_Module[];

  /* A user can have many permission */
  @OneToMany(() => Notification, (notification) => notification.user_send)
  @JoinTable()
  notification_send?: Notification[];

  /* A user can have many permission */
  @OneToMany(() => Notification, (notification) => notification.user_receive)
  @JoinTable()
  notification_receive?: Notification[];

  /* A user can have many sidebar menu */
  @OneToMany(() => Sidebar, (sidebar) => sidebar.user)
  @JoinTable()
  sidebar?: Sidebar[];

  /* A user can have many business */
  @OneToMany(() => Business, (business) => business.user)
  @JoinTable()
  business?: Business[];

  /* Dates */
  @Column({ nullable: true })
  user_save_date?: Date;

  @Column({ nullable: true })
  user_update_date?: Date;

  @Column({ nullable: true })
  user_delete_date?: Date;

  @Column({ nullable: true })
  user_is_delete?: boolean;
}
