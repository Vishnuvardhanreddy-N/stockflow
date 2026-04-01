import {
  Body, Controller, Delete, Get, HttpStatus, Logger,
  Param, Patch, Post, Put, Query, Req, Res, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(@Req() req, @Res() res, @Query('search') search?: string) {
    try {
      const data = await this.productsService.findAll(req.user.orgId, search);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Get(':id')
  async findOne(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const data = await this.productsService.findOne(id, req.user.orgId);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Post()
  async create(@Req() req, @Res() res, @Body() dto: CreateProductDto) {
    try {
      const data = await this.productsService.create(req.user.orgId, dto);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Put(':id')
  async update(@Req() req, @Res() res, @Param('id') id: string, @Body() dto: UpdateProductDto) {
    try {
      const data = await this.productsService.update(id, req.user.orgId, dto);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Patch(':id/adjust-stock')
  async adjustStock(@Req() req, @Res() res, @Param('id') id: string, @Body() dto: AdjustStockDto) {
    try {
      const data = await this.productsService.adjustStock(id, req.user.orgId, dto);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Delete(':id')
  async remove(@Req() req, @Res() res, @Param('id') id: string) {
    try {
      const data = await this.productsService.remove(id, req.user.orgId);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }
}
