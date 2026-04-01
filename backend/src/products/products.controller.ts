import {
  Controller, Get, Post, Put, Patch, Delete,
  Body, Param, Query, UseGuards, Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, AdjustStockDto } from './products.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(@Request() req, @Query('search') search?: string) {
    return this.productsService.findAll(req.user.orgId, search);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.productsService.findOne(id, req.user.orgId);
  }

  @Post()
  create(@Request() req, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.user.orgId, dto);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, req.user.orgId, dto);
  }

  @Patch(':id/adjust-stock')
  adjustStock(@Request() req, @Param('id') id: string, @Body() dto: AdjustStockDto) {
    return this.productsService.adjustStock(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.productsService.remove(id, req.user.orgId);
  }
}
