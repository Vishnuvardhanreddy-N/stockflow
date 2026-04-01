import { Body, Controller, Get, HttpStatus, Logger, Put, Req, Res, UseGuards } from '@nestjs/common';
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
  private logger = new Logger(SettingsController.name);

  constructor(private settingsService: SettingsService) {}

  @Get()
  async get(@Req() req, @Res() res) {
    try {
      const data = await this.settingsService.get(req.user.orgId);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Put()
  async update(@Req() req, @Res() res, @Body() dto: UpdateSettingsDto) {
    try {
      const data = await this.settingsService.update(req.user.orgId, dto.lowStockDefault);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }
}
