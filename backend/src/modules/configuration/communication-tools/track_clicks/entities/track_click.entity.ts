import { Business } from 'src/modules/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track_click')
export class TrackClick {
  @PrimaryGeneratedColumn('uuid')
  track_click_uid?: string;

  @Column({ nullable: true })
  track_click_description?: string;

  @Column({ nullable: true })
  track_click_is_active?: string;

  /* A track clicks can only have one business */
  @OneToOne(() => Business, (business) => business.track_clicks, {
    cascade: true,
  })
  @JoinTable()
  business?: Business;

  /* Dates */
  @Column({ nullable: true })
  track_click_save_date?: Date;

  @Column({ nullable: true })
  track_click_update_date?: Date;

  @Column({ nullable: true })
  track_click_delete_date?: Date;

  @Column({ nullable: true })
  track_click_is_delete?: boolean;
}
