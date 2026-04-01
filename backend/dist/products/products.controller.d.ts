import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';
export declare class ProductsController {
    private productsService;
    private logger;
    constructor(productsService: ProductsService);
    findAll(req: any, res: any, search?: string): Promise<void>;
    findOne(req: any, res: any, id: string): Promise<void>;
    create(req: any, res: any, dto: CreateProductDto): Promise<void>;
    update(req: any, res: any, id: string, dto: UpdateProductDto): Promise<void>;
    adjustStock(req: any, res: any, id: string, dto: AdjustStockDto): Promise<void>;
    remove(req: any, res: any, id: string): Promise<void>;
}
