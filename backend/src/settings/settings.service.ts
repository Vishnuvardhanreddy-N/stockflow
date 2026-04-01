import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgSettings } from './settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(OrgSettings) private settingsRepo: Repository<OrgSettings>,
  ) {}

  async get(orgId: string): Promise<OrgSettings> {
    let settings = await this.settingsRepo.findOne({ where: { organizationId: orgId } });
    if (!settings) {
      settings = this.settingsRepo.create({ organizationId: orgId, lowStockDefault: 5 });
      await this.settingsRepo.save(settings);
    }
    return settings;
  }

  async update(orgId: string, lowStockDefault: number): Promise<OrgSettings> {
    const settings = await this.get(orgId);
    settings.lowStockDefault = lowStockDefault;
    return this.settingsRepo.save(settings);
  }
}
