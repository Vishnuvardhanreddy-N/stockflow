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
var ProductsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const products_service_1 = require("./products.service");
const products_dto_1 = require("./products.dto");
let ProductsController = ProductsController_1 = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
        this.logger = new common_1.Logger(ProductsController_1.name);
    }
    async findAll(req, res, search) {
        try {
            const data = await this.productsService.findAll(req.user.orgId, search);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async findOne(req, res, id) {
        try {
            const data = await this.productsService.findOne(id, req.user.orgId);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async create(req, res, dto) {
        try {
            const data = await this.productsService.create(req.user.orgId, dto);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async update(req, res, id, dto) {
        try {
            const data = await this.productsService.update(id, req.user.orgId, dto);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async adjustStock(req, res, id, dto) {
        try {
            const data = await this.productsService.adjustStock(id, req.user.orgId, dto);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async remove(req, res, id) {
        try {
            const data = await this.productsService.remove(id, req.user.orgId);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, products_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, products_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/adjust-stock'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, products_dto_1.AdjustStockDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "adjustStock", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = ProductsController_1 = __decorate([
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map