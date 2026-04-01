import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';

@Entity('org_settings')
export class OrgSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  organizationId: string;

  @OneToOne(() => Organization)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @Column({ type: 'int', default: 5 })
  lowStockDefault: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
