import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { SettingsService } from '../settings/settings.service';
export declare class DashboardController {
    private productRepo;
    private settingsService;
    private logger;
    constructor(productRepo: Repository<Product>, settingsService: SettingsService);
    getSummary(req: any, res: any): Promise<void>;
}
