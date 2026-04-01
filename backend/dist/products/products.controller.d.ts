import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(req: any, search?: string): Promise<import("./product.entity").Product[]>;
    findOne(req: any, id: string): Promise<import("./product.entity").Product>;
    create(req: any, dto: CreateProductDto): Promise<import("./product.entity").Product>;
    update(req: any, id: string, dto: UpdateProductDto): Promise<import("./product.entity").Product>;
    adjustStock(req: any, id: string, dto: AdjustStockDto): Promise<import("./product.entity").Product>;
    remove(req: any, id: string): Promise<void>;
}
