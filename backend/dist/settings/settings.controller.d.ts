import { SettingsService } from './settings.service';
declare class UpdateSettingsDto {
    lowStockDefault: number;
}
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    get(req: any): Promise<import("./settings.entity").OrgSettings>;
    update(req: any, dto: UpdateSettingsDto): Promise<import("./settings.entity").OrgSettings>;
}
export {};
