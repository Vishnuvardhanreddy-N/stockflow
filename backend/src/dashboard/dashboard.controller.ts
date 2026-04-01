import { Controller, Get, HttpStatus, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from '../products/product.entity';
import { SettingsService } from '../settings/settings.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  private logger = new Logger(DashboardController.name);

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private settingsService: SettingsService,
  ) {}

  @Get()
  async getSummary(@Req() req, @Res() res) {
    try {
      const orgId = req.user.orgId;
      const settings = await this.settingsService.get(orgId);
      const threshold = settings.lowStockDefault;

      const products = await this.productRepo.find({
        where: { organizationId: orgId, deletedAt: IsNull() },
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

      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }
}
