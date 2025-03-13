import { User } from 'src/modules/configuration/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { MainModule } from '../../entities/main_module.entity';
import { Business } from 'src/modules/business/entities/business.entity';
import { BusinessOwner } from 'src/modules/business_owner/entities/business_owner.entity';

@Entity('permission_module')
export class Permissions_Module {
  @PrimaryGeneratedColumn('uuid')
  permissions_module_uid?: string;

  @Column({ nullable: true })
  has_access?: boolean;

  /* A permission can only have one user */
  @ManyToOne(() => User, (user) => user.permissions_module)
  @JoinTable()
  user?: User;

  /* A permission user can only have one permission */
  @ManyToOne(() => MainModule, (main_module) => main_module.permissions_module)
  @JoinTable()
  main_module?: MainModule;

  /* A permission user can only have one business */
  @ManyToOne(() => Business, (business) => business.permissions_module)
  @JoinTable()
  business?: Business;

  /* A permission user can only have one business owner */
  @ManyToOne(
    () => BusinessOwner,
    (business_owner) => business_owner.permissions_module,
  )
  @JoinTable()
  business_owner?: BusinessOwner;

  /* Dates */
  @Column({ nullable: true })
  permissions_module_save_date?: Date;

  @Column({ nullable: true })
  permissions_module_update_date?: Date;

  @Column({ nullable: true })
  permissions_module_delete_date?: Date;

  @Column({ nullable: true })
  permissions_module_is_delete?: boolean;
}
