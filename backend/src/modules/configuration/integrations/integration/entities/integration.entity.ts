import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Icategory } from '../../icategory/entities/icategory.entity';

@Entity('integrations')
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  integrations_uid?: string;

  @Column({ nullable: true })
  integrations_uid_default?: string;

  @Column({ nullable: true })
  category_uid_default?: string;

  @Column({ nullable: true })
  integrations_name?: string;

  @Column({ nullable: true })
  integrations_image?: string;

  @Column({ nullable: true })
  is_instaled?: boolean;

  @Column({ nullable: true })
  background_color?: string;

  @Column({ nullable: true })
  button_color?: string;

  @Column({ nullable: true })
  icon_color?: string;

  @ManyToOne(() => Icategory, (category) => category.integrations, {
    cascade: true,
  })
  @JoinTable()
  category?: Icategory;

  /* Dates */
  @Column({ nullable: true })
  integrations_save_date?: Date;

  @Column({ nullable: true })
  integrations_update_date?: Date;

  @Column({ nullable: true })
  integrations_delete_date?: Date;

  @Column({ nullable: true })
  integrations_is_delete?: boolean;
}
