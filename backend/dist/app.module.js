"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const organizations_module_1 = require("./organizations/organizations.module");
const settings_module_1 = require("./settings/settings.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const organization_entity_1 = require("./organizations/organization.entity");
const user_entity_1 = require("./auth/user.entity");
const product_entity_1 = require("./products/product.entity");
const settings_entity_1 = require("./settings/settings.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3308,
                username: 'root',
                password: 'password',
                database: 'stockflow',
                entities: [organization_entity_1.Organization, user_entity_1.User, product_entity_1.Product, settings_entity_1.OrgSettings],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            organizations_module_1.OrganizationsModule,
            products_module_1.ProductsModule,
            settings_module_1.SettingsModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map