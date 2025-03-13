import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';
import { Permissions_Module } from '../permissions_modules/entities/permissions_module.entity';

@Entity('main_module')
export class MainModule {
  @PrimaryGeneratedColumn('uuid')
  main_module_uid?: string;

  @Column({ nullable: true })
  main_module_description?: string;

  @Column({ nullable: true })
  main_module_ico?: string;

  /* A main module can only have many permissions */
  @OneToMany(() => Permission, (permission) => permission.main_module, {
    cascade: true,
  })
  @JoinTable()
  permissions?: Permission[];

  /* A main module can only have many permissions module */
  @OneToMany(() => Permissions_Module, (permission) => permission.main_module, {
    cascade: true,
  })
  @JoinTable()
  permissions_module?: Permissions_Module[];

  /* Dates */
  @Column({ nullable: true })
  main_module_save_date?: Date;

  @Column({ nullable: true })
  main_module_update_date?: Date;

  @Column({ nullable: true })
  main_module_delete_date?: Date;

  @Column({ nullable: true })
  main_module_is_delete?: boolean;
}
