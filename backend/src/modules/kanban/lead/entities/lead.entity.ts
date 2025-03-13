import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import { Status } from '../../status/entities/status.entity';
import { FollowUp } from '../follow-up/entities/follow-up.entity';
import { LeadChat } from '../lead-chat/entities/lead-chat.entity';

@Entity('kanban_lead')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  lead_uid?: string;

  @Column({ nullable: true })
  lead_name?: string;

  @Column({ nullable: true })
  lead_last_name?: string;

  @Column({ nullable: true })
  lead_code_generated?: string;

  @Column({ nullable: true })
  lead_number_generated?: number;

  @Column({ nullable: true })
  lead_chat_code_generated?: string;

  @Column({ nullable: true })
  lead_chat_number_generated?: number;

  @Column({ nullable: true })
  lead_email?: string;

  @Column({ nullable: true })
  lead_description?: string;

  @Column({ nullable: true })
  lead_company?: string;

  @Column({ nullable: true })
  lead_work_position?: string;

  @Column({ nullable: true })
  lead_phone?: string;

  @Column({ nullable: true })
  lead_contact_social_network?: string;

  @Column({ nullable: true })
  lead_budget?: string;

  @Column({ nullable: true })
  lead_expected_income?: string;

  @Column({ nullable: true })
  lead_assigned_to?: string;

  @Column({ nullable: true })
  lead_last_follow_up?: Date;

  @Column({ nullable: true })
  lead_wa_id?: string;

  @Column({ nullable: true })
  lead_messaging_product?: string;

  @Column({ nullable: true, default: false })
  is_leads?: boolean;

  @Column({ nullable: true, default: false })
  is_customer?: boolean;

  @Column({ nullable: true, default: false })
  is_chat_active?: boolean;

  status_uid?: string;

  /* A lead can only have one business */
  @ManyToOne(() => Status, (status) => status.lead, {
    cascade: true,
  })
  @JoinTable()
  status?: Status;

  @OneToMany(() => FollowUp, (follow_up) => follow_up.lead)
  @JoinTable()
  follow_up?: FollowUp[];

  @OneToMany(() => Sale, (sale) => sale.lead)
  @JoinTable()
  sale?: Sale[];

  @OneToMany(() => LeadChat, (lead_chat) => lead_chat.lead)
  @JoinTable()
  lead_chat?: LeadChat[];

  /* Dates */
  @Column({ nullable: true })
  lead_save_date?: Date;

  @Column({ nullable: true })
  lead_update_date?: Date;

  @Column({ nullable: true })
  lead_delete_date?: Date;

  @Column({ nullable: true })
  lead_is_delete?: boolean;
}
