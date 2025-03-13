import { Access } from 'src/modules/auth/entities/access.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('whatsapp_info')
export class WhatsAppInfo {
  @PrimaryGeneratedColumn('uuid')
  whatsapp_info_uid?: string;

  /* The email I need to perform a search and verify if the user exists */
  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  phone_number_uid?: string;

  @ManyToOne(() => Access, (access) => access.whatsapp_info, {
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
