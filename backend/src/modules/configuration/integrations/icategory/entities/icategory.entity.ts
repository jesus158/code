import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Integration } from '../../integration/entities/integration.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Entity('integration_category')
export class Icategory {
  @PrimaryGeneratedColumn('uuid')
  category_uid?: string;

  @Column({ nullable: true })
  category_name?: string;

  @Column({ nullable: true })
  category_uid_default?: string;

  /* A category can only have one business */
  @ManyToOne(() => Business, (business) => business.icategory, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  @OneToMany(() => Integration, (integration) => integration.category)
  @JoinTable()
  integrations?: Integration[];

  /* Dates */
  @Column({ nullable: true })
  category_save_date?: Date;

  @Column({ nullable: true })
  category_update_date?: Date;

  @Column({ nullable: true })
  category_delete_date?: Date;

  @Column({ nullable: true })
  category_is_delete?: boolean;
}
