import { SettingsService } from './settings.service';
declare class UpdateSettingsDto {
    lowStockDefault: number;
}
export declare class SettingsController {
    private settingsService;
    private logger;
    constructor(settingsService: SettingsService);
    get(req: any, res: any): Promise<void>;
    update(req: any, res: any, dto: UpdateSettingsDto): Promise<void>;
}
export {};
