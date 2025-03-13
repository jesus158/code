import { BusinessOwner } from 'src/modules/business_owner/entities/business_owner.entity';
import { User } from 'src/modules/configuration/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessUser } from './access_user.entity';
import { WhatsAppInfo } from 'src/modules/apis/whatsapp_api/entities/whatsapp_info.entity';

@Entity('access')
export class Access {
  @PrimaryGeneratedColumn('uuid')
  access_uid?: string;

  /* The email I need to perform a search and verify if the user exists */
  @Column({ nullable: true })
  access_email?: string;

  /* to get the data from the front end */
  @Column({ nullable: true })
  access_username?: string;

  username_or_email?: string;

  /* This field is needed only to obtain the password */
  access_password?: string;

  /* This field is used only to send the owner data to the front end,
   but no field will be created within the database */
  owner?: BusinessOwner;

  /* This field is used only to send the user's data to the front end,
 but no field will be created within the database */
  user?: User;

  @OneToMany(() => AccessUser, (access_user) => access_user.access)
  @JoinTable()
  access_user?: AccessUser[];

  @OneToMany(() => WhatsAppInfo, (whatsapp_info) => whatsapp_info.access)
  @JoinTable()
  whatsapp_info?: WhatsAppInfo[];

  /* Dates */
  @Column({ nullable: true })
  access_save_date?: Date;

  @Column({ nullable: true })
  access_update_date?: Date;

  @Column({ nullable: true })
  access_delete_date?: Date;

  @Column({ nullable: true })
  access_is_delete?: boolean;

  /* This is the access code that is generated to obtain information from the database */
  @Column({ nullable: true })
  db_access?: string;

  /* You need to store the database name to make a connection to the respective database */
  @Column({ nullable: true })
  db_name?: string;
}
