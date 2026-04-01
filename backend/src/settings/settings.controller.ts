import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';

class UpdateSettingsDto {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  lowStockDefault: number;
}

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  get(@Request() req) {
    return this.settingsService.get(req.user.orgId);
  }

  @Put()
  update(@Request() req, @Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(req.user.orgId, dto.lowStockDefault);
  }
}
