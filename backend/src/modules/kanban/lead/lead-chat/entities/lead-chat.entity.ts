import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lead } from '../../entities/lead.entity';

@Entity('kanban_lead_chat')
export class LeadChat {
  @PrimaryGeneratedColumn('uuid')
  lead_chat_uid?: string;

  @Column({ nullable: true })
  lead_chat_from?: string;

  @Column({ nullable: true })
  lead_chat_message_id?: string;

  @Column({ nullable: true })
  lead_chat_timestamp?: string;

  @Column({ nullable: true })
  lead_chat_type?: string;

  @Column({ nullable: true })
  lead_chat_body?: string;

  @ManyToOne(() => Lead, (lead) => lead.lead_chat, {
    cascade: true,
  })
  @JoinTable()
  lead?: Lead;

  /* Dates */
  @Column({ nullable: true })
  lead_chat_save_date?: Date;

  @Column({ nullable: true })
  lead_chat_update_date?: Date;

  @Column({ nullable: true })
  lead_chat_delete_date?: Date;

  @Column({ nullable: true })
  lead_chat_is_delete?: boolean;
}
