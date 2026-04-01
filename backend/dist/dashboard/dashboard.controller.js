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
var DashboardController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const product_entity_1 = require("../products/product.entity");
const settings_service_1 = require("../settings/settings.service");
let DashboardController = DashboardController_1 = class DashboardController {
    constructor(productRepo, settingsService) {
        this.productRepo = productRepo;
        this.settingsService = settingsService;
        this.logger = new common_1.Logger(DashboardController_1.name);
    }
    async getSummary(req, res) {
        try {
            const orgId = req.user.orgId;
            const settings = await this.settingsService.get(orgId);
            const threshold = settings.lowStockDefault;
            const products = await this.productRepo.find({
                where: { organizationId: orgId, deletedAt: (0, typeorm_2.IsNull)() },
            });
            const totalProducts = products.length;
            const totalUnits = products.reduce((sum, p) => sum + Number(p.quantity), 0);
            const lowStockItems = products.filter((p) => {
                const t = p.lowStockThreshold != null ? p.lowStockThreshold : threshold;
                return p.quantity <= t;
            });
            const data = {
                totalProducts,
                totalUnits,
                lowStockCount: lowStockItems.length,
                lowStockItems: lowStockItems.map((p) => ({
                    id: p.id,
                    name: p.name,
                    sku: p.sku,
                    quantity: p.quantity,
                    lowStockThreshold: p.lowStockThreshold ?? threshold,
                })),
            };
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSummary", null);
exports.DashboardController = DashboardController = DashboardController_1 = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        settings_service_1.SettingsService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map