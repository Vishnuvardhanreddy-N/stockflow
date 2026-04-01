import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => User, (u) => u.organization)
  users: User[];

  @OneToMany(() => Product, (p) => p.organization)
  products: Product[];
}
