import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MainModule } from '../../entities/main_module.entity';
import { User } from 'src/modules/configuration/user/entities/user.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  permissions_uid?: string;

  @Column({ nullable: true })
  is_show_view?: boolean;

  @Column({ nullable: true })
  is_get?: boolean;

  @Column({ nullable: true })
  is_save?: boolean;

  @Column({ nullable: true })
  is_edit?: boolean;

  @Column({ nullable: true })
  is_delete?: boolean;

  /* A permission can only have many permission users */
  @OneToMany(() => User, (user) => user.permissions, {
    cascade: true,
  })
  @JoinTable()
  user?: User[];

  /* A permission can only have many main modules */
  @ManyToOne(() => MainModule, (main_module) => main_module.permissions)
  @JoinTable()
  main_module?: MainModule;

  @ManyToOne(() => Business, (business) => business.permissions)
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  permissions_save_date?: Date;

  @Column({ nullable: true })
  permissions_update_date?: Date;

  @Column({ nullable: true })
  permissions_delete_date?: Date;

  @Column({ nullable: true })
  permissions_is_delete?: boolean;
}
