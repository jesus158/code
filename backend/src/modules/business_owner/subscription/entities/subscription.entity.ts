import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BusinessOwner } from '../../entities/business_owner.entity';
import { Plan } from 'src/modules/configuration/plans/entities/plan.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  subscriptions_uid?: string;

  @Column({ nullable: true })
  subscriptions_description?: string;

  @Column({ nullable: true })
  subscriptions_quantity?: number;

  @Column({ nullable: true })
  subscriptions_month?: number;

  @Column({ nullable: true })
  subscriptions_month_price?: number;

  @Column({ nullable: true })
  subscriptions_number_licenses?: number;

  @Column({ nullable: true })
  subscriptions_total_to_pay?: number;

  @Column({ nullable: true })
  subscriptions_start_date?: Date;

  @Column({ nullable: true })
  subscriptions_count_of_days?: number;

  @Column({ nullable: true })
  subscriptions_finish_date?: Date;

  @ManyToOne(() => BusinessOwner, (owner) => owner.subscription)
  @JoinTable()
  business_owner?: BusinessOwner;

  @ManyToOne(() => Business, (business) => business.subscription)
  @JoinTable()
  business?: Business;

  @ManyToOne(() => Plan, (plan) => plan.subscription)
  @JoinTable()
  plan?: Plan;

  /* I have placed this field to send the array of plans available in our database */
  plans?: Plan[];

  /* Dates */
  @Column({ nullable: true })
  subscriptions_save_date?: Date;

  @Column({ nullable: true })
  subscriptions_update_date?: Date;

  @Column({ nullable: true })
  subscriptions_delete_date?: Date;

  @Column({ nullable: true })
  subscriptions_is_delete?: boolean;
}
