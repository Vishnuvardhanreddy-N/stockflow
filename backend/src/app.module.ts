import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Organization } from './organizations/organization.entity';
import { User } from './auth/user.entity';
import { Product } from './products/product.entity';
import { OrgSettings } from './settings/settings.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'stockflow',
  entities: [Organization, User, Product, OrgSettings],
  synchronize: true,
}),
    AuthModule,
    OrganizationsModule,
    ProductsModule,
    SettingsModule,
    DashboardModule,
  ],
})
export class AppModule {}
