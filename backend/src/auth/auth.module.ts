import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.entity';
import { Organization } from '../organizations/organization.entity';
import { OrgSettings } from '../settings/settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization, OrgSettings]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'stockflow-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}

export { JwtAuthGuard } from './jwt-auth.guard';
