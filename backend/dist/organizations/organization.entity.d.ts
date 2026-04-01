import { User } from '../auth/user.entity';
import { Product } from '../products/product.entity';
export declare class Organization {
    id: string;
    name: string;
    createdAt: Date;
    users: User[];
    products: Product[];
}
