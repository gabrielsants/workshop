import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from '../product/models/product-model.entity';
import { UsersModule } from '../users/users.module';
import { PartsController } from './controllers/parts.controller';
import { PartsHistoric } from './models/parts-historic.entity';
import { Parts } from './models/parts.entity';
import { PartsHistoricService } from './services/parts-historic.service';
import { PartsService } from './services/parts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parts, PartsHistoric]),
    MulterModule.register({
      dest: './images',
    }),
    UsersModule,
  ],
  providers: [PartsService, PartsHistoricService],
  controllers: [PartsController],
})
export class PartsModule {}
