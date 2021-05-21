import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductHistoric } from './models/product-historic.entity';
import { ProductModel } from './models/product-model.entity';
import { ProductHistoricService } from './services/product-historic/product-historic.service';
import { ProductLineService } from './services/product-model/product-line.service';
import { ProductService } from './services/product/product.service';
import { UsersModule } from '../users/users.module';
import { ProductController } from './controller/product/product.controller';
import { ProductLineController } from './controller/product-line/product-line.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductModel, ProductHistoric]),
    UsersModule,
  ],
  providers: [ProductHistoricService, ProductLineService, ProductService],
  controllers: [ProductLineController, ProductController],
})
export class ProductModule {}
