import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(orgId: string, search?: string): Promise<Product[]> {
    const qb = this.productRepo.createQueryBuilder('p')
      .where('p.organizationId = :orgId', { orgId })
      .andWhere('p.deletedAt IS NULL')
      .orderBy('p.createdAt', 'DESC');

    if (search) {
      qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    }
    return qb.getMany();
  }

  async findOne(id: string, orgId: string): Promise<Product> {
    const p = await this.productRepo.findOne({ where: { id, organizationId: orgId, deletedAt: IsNull() } });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async create(orgId: string, dto: CreateProductDto): Promise<Product> {
    const exists = await this.productRepo.findOne({
      where: { sku: dto.sku, organizationId: orgId, deletedAt: IsNull() },
    });
    if (exists) throw new ConflictException('SKU already exists in your organization');

    const product = this.productRepo.create({ ...dto, organizationId: orgId });
    return this.productRepo.save(product);
  }

  async update(id: string, orgId: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id, orgId);
    if (dto.sku && dto.sku !== product.sku) {
      const exists = await this.productRepo.findOne({
        where: { sku: dto.sku, organizationId: orgId, deletedAt: IsNull() },
      });
      if (exists) throw new ConflictException('SKU already exists in your organization');
    }
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async adjustStock(id: string, orgId: string, dto: AdjustStockDto): Promise<Product> {
    const product = await this.findOne(id, orgId);
    product.quantity = Math.max(0, product.quantity + dto.delta);
    return this.productRepo.save(product);
  }

  async remove(id: string, orgId: string): Promise<void> {
    const product = await this.findOne(id, orgId);
    product.deletedAt = new Date();
    await this.productRepo.save(product);
  }
}
