import { Business } from 'src/modules/business/entities/business.entity';
import { User } from 'src/modules/configuration/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Permissions_Module } from 'src/modules/main_modules/permissions_modules/entities/permissions_module.entity';

@Entity('business_owner')
export class BusinessOwner {
  @PrimaryGeneratedColumn('uuid')
  business_owner_uid?: string;

  @Column({ nullable: true })
  business_owner_firts_name?: string;

  @Column({ nullable: true })
  business_owner_last_name?: string;

  @Column({ nullable: true })
  business_owner_number_phone?: string;

  @Column({ nullable: true })
  business_owner_email?: string;

  @Column({ nullable: true })
  business_owner_password?: string;

  @Column({ nullable: true })
  business_owner_birthday?: Date;

  @Column({ nullable: true })
  business_owner_country?: string;

  @Column({ nullable: true })
  business_owner_username?: string;

  /* A business owner can have multiple users */
  @OneToMany(() => User, (user) => user.business_owner)
  @JoinTable()
  users?: User[];

  /* A business owner can have multiple businesses */
  @OneToMany(() => Business, (business) => business.business_owner)
  @JoinTable()
  business?: Business[];

  /* A business owner can have multiple subscriptions */
  @OneToMany(() => Subscription, (subscription) => subscription.business_owner)
  @JoinTable()
  subscription?: Subscription[];

  /* A business owner can have multiple permissions module */
  @OneToMany(
    () => Permissions_Module,
    (permissions_module) => permissions_module.business_owner,
  )
  @JoinTable()
  permissions_module?: Permissions_Module[];

  /* Dates */
  @Column({ nullable: true })
  business_owner_save_date?: Date;

  @Column({ nullable: true })
  business_owner_update_date?: Date;

  @Column({ nullable: true })
  business_owner_delete_date?: Date;

  @Column({ nullable: true })
  business_owner_is_delete?: boolean;
}
