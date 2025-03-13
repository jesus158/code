import { BusinessOwner } from 'src/modules/business_owner/entities/business_owner.entity';
import { Subscription } from 'src/modules/business_owner/subscription/entities/subscription.entity';
import { Office } from 'src/modules/catalog/office/entities/office.entity';
import { Staff } from 'src/modules/catalog/staff/entities/staff.entity';
import { WorkTeam } from 'src/modules/catalog/work_team/entities/work_team.entity';
import { Workstation } from 'src/modules/catalog/workstation/entities/workstation.entity';
import { ResponseTemplate } from 'src/modules/configuration/communication-tools/response_template/entities/response_template.entity';
import { Salesbot } from 'src/modules/configuration/communication-tools/salesbot/entities/salesbot.entity';
import { TrackClick } from 'src/modules/configuration/communication-tools/track_clicks/entities/track_click.entity';
import { Icategory } from 'src/modules/configuration/integrations/icategory/entities/icategory.entity';
import { Preference } from 'src/modules/configuration/preferences/entities/preference.entity';
import { User } from 'src/modules/configuration/user/entities/user.entity';
import { Status } from 'src/modules/kanban/status/entities/status.entity';
import { Permission } from 'src/modules/main_modules/permissions/entities/permission.entity';
import { Permissions_Module } from 'src/modules/main_modules/permissions_modules/entities/permissions_module.entity';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  business_uid?: string;

  @Column({ nullable: true })
  business_name?: string;

  @Column({ nullable: true })
  business_description?: string;

  @Column({ nullable: true })
  business_image?: string;

  @Column({ nullable: true })
  business_file_name?: string;

  @Column({ nullable: true })
  business_file_name_delete?: string;
  /* What we will do with this field is that we will extract the name 
of the database in lower case, to assign the corresponding link of its access */

  /* A business can only have one owner */
  @ManyToOne(() => BusinessOwner, (business_owner) => business_owner.business, {
    cascade: true,
  })
  @JoinTable()
  business_owner?: BusinessOwner;

  /* A business can only have one owner */
  @ManyToOne(() => User, (user) => user.business, {
    cascade: true,
  })
  @JoinTable()
  user?: User;

  @OneToMany(() => Subscription, (subscription) => subscription.business)
  @JoinTable()
  subscription?: Subscription[];

  /* A business can have many offices */
  @OneToMany(() => Office, (office) => office.business)
  @JoinTable()
  office?: Office[];

  /* A business can have many staff */
  @OneToMany(() => Staff, (staff) => staff.business)
  @JoinTable()
  staff?: Staff[];

  /* A business can have many work team */
  @OneToMany(() => WorkTeam, (workteam) => workteam.business)
  @JoinTable()
  workteam?: WorkTeam[];

  /* A business can have many workstation */
  @OneToMany(() => Workstation, (workstation) => workstation.business)
  @JoinTable()
  workstation?: Workstation[];

  /* A business can have many customers */
  @OneToMany(() => Sale, (sale) => sale.business)
  @JoinTable()
  sale?: Sale[];

  /* A business can have many follow up */
  @OneToMany(() => Status, (follow) => follow.business)
  @JoinTable()
  status?: Status[];

  /* A business can have many preferences */
  @OneToMany(() => Preference, (preferences) => preferences.business)
  @JoinTable()
  preferences?: Preference[];

  /* A business can have many icategory */
  @OneToMany(() => Icategory, (category) => category.business)
  @JoinTable()
  icategory?: Icategory[];

  /* A business can have many response template */
  @OneToMany(() => ResponseTemplate, (response) => response.business)
  @JoinTable()
  response_template?: ResponseTemplate[];

  /* A business can have many salesbot */
  @OneToMany(() => Salesbot, (salesbot) => salesbot.business)
  @JoinTable()
  salesbot?: Salesbot[];

  /* A business can have one track clicks */
  @OneToOne(() => TrackClick, (track_clicks) => track_clicks.business)
  @JoinTable()
  track_clicks?: TrackClick;

  /* A business can have many permissions */
  @OneToMany(() => Permission, (permission) => permission.business)
  @JoinTable()
  permissions?: Permission[];

  /* A business can have many permissions module */
  @OneToMany(
    () => Permissions_Module,
    (permission_module) => permission_module.business,
  )
  @JoinTable()
  permissions_module?: Permissions_Module[];

  /* Dates */
  @Column({ nullable: true })
  business_save_date?: Date;

  @Column({ nullable: true })
  business_update_date?: Date;

  @Column({ nullable: true })
  business_delete_date?: Date;

  @Column({ nullable: true })
  business_is_delete?: boolean;
}
