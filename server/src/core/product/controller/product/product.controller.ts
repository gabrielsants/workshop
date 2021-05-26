import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Product } from '../../models/product.entity';
import { ProductLineService } from '../../services/product-model/product-line.service';
import { ProductService } from '../../services/product/product.service';

@Controller('api/product')
export class ProductController {
  constructor(
    private productLService: ProductLineService,
    private productService: ProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('getProductAndModels')
  async getProductAndModels() {
    return this.productLService.getProductAndModels();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() product: Product): Promise<string> {
    product = await this.productService.save(product);
    return `O produto #${product.name} foi salvo com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() product: Product): Promise<string> {
    product = await this.productService.updateEntity(product);
    return `O produto #${product.name} foi atualizado com sucesso!`;
  }
}
