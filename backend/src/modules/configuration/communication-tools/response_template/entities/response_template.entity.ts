import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('response_template')
export class ResponseTemplate {
  @PrimaryGeneratedColumn('uuid')
  response_template_uid?: string;

  @Column({ nullable: true })
  response_template_name?: string;

  @Column({ nullable: true })
  response_template_response_text?: string;

  /* A response template can only have one business */
  @ManyToOne(() => Business, (business) => business.response_template, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  response_template_save_date?: Date;

  @Column({ nullable: true })
  response_template_update_date?: Date;

  @Column({ nullable: true })
  response_template_delete_date?: Date;

  @Column({ nullable: true })
  response_template_is_delete?: boolean;
}
