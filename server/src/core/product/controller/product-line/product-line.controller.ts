import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/core/users/services/users/users.service';
import { ProductHistoric } from '../../models/product-historic.entity';
import { ProductModel } from '../../models/product-model.entity';
import { ProductHistoricService } from '../../services/product-historic/product-historic.service';
import { ProductLineService } from '../../services/product-model/product-line.service';

@Controller('product-line')
export class ProductLineController {
  constructor(
    private userService: UsersService,
    private productLService: ProductLineService,
    private productLineHistoric: ProductHistoricService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.productLService.getProductAndModels();
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(
    @Body() productLine: ProductModel,
    @Request() req,
  ): Promise<string> {
    productLine = await this.productLService.save(productLine);

    let historic = new ProductHistoric();
    historic.user = await this.userService.findOne(req.user.userId);
    historic.message = 'CREATED';
    historic.modifiedIn = new Date(Date.now());
    historic.productModel = productLine;

    await this.productLineHistoric.save(historic);

    return `A linha #${productLine.name} foi salva com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(
    @Body() productLine: ProductModel,
    @Request() req,
  ): Promise<string> {
    productLine = await this.productLService.updateEntity(productLine);

    let historic = new ProductHistoric();
    historic.user = await this.userService.findOne(req.user.userId);
    historic.message = 'UPDATED';
    historic.modifiedIn = new Date(Date.now());
    historic.productModel = productLine;

    await this.productLineHistoric.save(historic);

    return `A linha #${productLine.name} foi atualizada com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('historic')
  async getHistoric(): Promise<ProductHistoric[]> {
    return this.productLineHistoric.getHistoricsWithRelations();
  }
}
