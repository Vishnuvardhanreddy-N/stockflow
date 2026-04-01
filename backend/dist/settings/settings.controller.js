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
var SettingsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const settings_service_1 = require("./settings.service");
class UpdateSettingsDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "lowStockDefault", void 0);
let SettingsController = SettingsController_1 = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.logger = new common_1.Logger(SettingsController_1.name);
    }
    async get(req, res) {
        try {
            const data = await this.settingsService.get(req.user.orgId);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
    async update(req, res, dto) {
        try {
            const data = await this.settingsService.update(req.user.orgId, dto.lowStockDefault);
            res.status(common_1.HttpStatus.OK).send({ message: 'success', data });
        }
        catch (e) {
            this.logger.error(e);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
        }
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, UpdateSettingsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "update", null);
exports.SettingsController = SettingsController = SettingsController_1 = __decorate([
    (0, common_1.Controller)('settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map