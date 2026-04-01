import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { SettingsModule } from '../settings/settings.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SettingsModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
