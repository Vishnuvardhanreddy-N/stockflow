import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { SettingsService } from '../settings/settings.service';
export declare class DashboardController {
    private productRepo;
    private settingsService;
    constructor(productRepo: Repository<Product>, settingsService: SettingsService);
    getSummary(req: any): Promise<{
        totalProducts: number;
        totalUnits: number;
        lowStockCount: number;
        lowStockItems: {
            id: string;
            name: string;
            sku: string;
            quantity: number;
            lowStockThreshold: number;
        }[];
    }>;
}
