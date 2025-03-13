import { Business } from 'src/modules/business/entities/business.entity';
import { Lead } from 'src/modules/kanban/lead/entities/lead.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  sales_uid?: string;

  @Column({ nullable: true })
  sales_price?: number;

  @Column({ nullable: true })
  sales_quantity?: number;

  @Column({ nullable: true })
  sales_description?: string;

  @Column({ nullable: true })
  sales_type?: string;

  /* A sale can only have one business */
  @ManyToOne(() => Business, (business) => business.sale, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* A sale can only have one customer */
  /* It connects to lead, since leads become customers to obtain
   the same information and avoid data redundancy. */
  @ManyToOne(() => Lead, (lead) => lead.sale, {
    cascade: true,
  })
  @JoinTable()
  lead?: Lead;

  /* Dates */
  @Column({ nullable: true })
  sales_save_date?: Date;

  @Column({ nullable: true })
  sales_update_date?: Date;

  @Column({ nullable: true })
  sales_delete_date?: Date;

  @Column({ nullable: true })
  sales_is_delete?: boolean;
}
