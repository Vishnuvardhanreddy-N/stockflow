export declare class CreateProductDto {
    name: string;
    sku: string;
    description?: string;
    quantity: number;
    costPrice?: number;
    sellingPrice?: number;
    lowStockThreshold?: number;
}
export declare class UpdateProductDto {
    name?: string;
    sku?: string;
    description?: string;
    quantity?: number;
    costPrice?: number;
    sellingPrice?: number;
    lowStockThreshold?: number;
}
export declare class AdjustStockDto {
    delta: number;
    note?: string;
}
