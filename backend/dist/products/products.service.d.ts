import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';
export declare class ProductsService {
    private productRepo;
    constructor(productRepo: Repository<Product>);
    findAll(orgId: string, search?: string): Promise<Product[]>;
    findOne(id: string, orgId: string): Promise<Product>;
    create(orgId: string, dto: CreateProductDto): Promise<Product>;
    update(id: string, orgId: string, dto: UpdateProductDto): Promise<Product>;
    adjustStock(id: string, orgId: string, dto: AdjustStockDto): Promise<Product>;
    remove(id: string, orgId: string): Promise<void>;
}
