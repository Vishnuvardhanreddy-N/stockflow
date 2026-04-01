import { Repository } from 'typeorm';
import { OrgSettings } from './settings.entity';
export declare class SettingsService {
    private settingsRepo;
    constructor(settingsRepo: Repository<OrgSettings>);
    get(orgId: string): Promise<OrgSettings>;
    update(orgId: string, lowStockDefault: number): Promise<OrgSettings>;
}
