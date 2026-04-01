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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
const organization_entity_1 = require("../organizations/organization.entity");
const settings_entity_1 = require("../settings/settings.entity");
let AuthService = class AuthService {
    constructor(userRepo, orgRepo, settingsRepo, jwtService) {
        this.userRepo = userRepo;
        this.orgRepo = orgRepo;
        this.settingsRepo = settingsRepo;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email already registered');
        const org = this.orgRepo.create({ name: dto.orgName });
        await this.orgRepo.save(org);
        const settings = this.settingsRepo.create({ organizationId: org.id, lowStockDefault: 5 });
        await this.settingsRepo.save(settings);
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ email: dto.email, passwordHash, organizationId: org.id });
        await this.userRepo.save(user);
        return this.makeToken(user, org);
    }
    async login(dto) {
        const user = await this.userRepo.findOne({
            where: { email: dto.email },
            relations: ['organization'],
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.makeToken(user, user.organization);
    }
    makeToken(user, org) {
        const payload = { sub: user.id, orgId: org.id, orgName: org.name, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, email: user.email, orgId: org.id, orgName: org.name },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(2, (0, typeorm_1.InjectRepository)(settings_entity_1.OrgSettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map