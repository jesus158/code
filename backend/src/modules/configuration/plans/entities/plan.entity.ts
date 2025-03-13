import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from 'src/modules/business_owner/subscription/entities/subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  plans_uid?: string;

  @Column({ nullable: true })
  plans_name?: string;

  @Column({ nullable: true })
  plans_description?: string;

  @Column({ nullable: true })
  plans_price?: string;

  /* A plan can only have many subscriptions */
  @OneToMany(() => Subscription, (sub) => sub.plans)
  @JoinTable()
  subscription?: Subscription[];

  /* Dates */
  @Column({ nullable: true })
  plans_save_date?: Date;

  @Column({ nullable: true })
  plans_update_date?: Date;

  @Column({ nullable: true })
  plans_delete_date?: Date;

  @Column({ nullable: true })
  plans_is_delete?: boolean;
}
