import { Organization } from '../organizations/organization.entity';
export declare class Product {
    id: string;
    organizationId: string;
    organization: Organization;
    name: string;
    sku: string;
    description: string;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    lowStockThreshold: number;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
