"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductsService = class ProductsService {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async findAll(orgId, search) {
        const qb = this.productRepo.createQueryBuilder('p')
            .where('p.organizationId = :orgId', { orgId })
            .andWhere('p.deletedAt IS NULL')
            .orderBy('p.createdAt', 'DESC');
        if (search) {
            qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
        }
        return qb.getMany();
    }
    async findOne(id, orgId) {
        const p = await this.productRepo.findOne({ where: { id, organizationId: orgId, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!p)
            throw new common_1.NotFoundException('Product not found');
        return p;
    }
    async create(orgId, dto) {
        const exists = await this.productRepo.findOne({
            where: { sku: dto.sku, organizationId: orgId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (exists)
            throw new common_1.ConflictException('SKU already exists in your organization');
        const product = this.productRepo.create({ ...dto, organizationId: orgId });
        return this.productRepo.save(product);
    }
    async update(id, orgId, dto) {
        const product = await this.findOne(id, orgId);
        if (dto.sku && dto.sku !== product.sku) {
            const exists = await this.productRepo.findOne({
                where: { sku: dto.sku, organizationId: orgId, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (exists)
                throw new common_1.ConflictException('SKU already exists in your organization');
        }
        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async adjustStock(id, orgId, dto) {
        const product = await this.findOne(id, orgId);
        product.quantity = Math.max(0, product.quantity + dto.delta);
        return this.productRepo.save(product);
    }
    async remove(id, orgId) {
        const product = await this.findOne(id, orgId);
        product.deletedAt = new Date();
        await this.productRepo.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map