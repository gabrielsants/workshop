import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsController } from './controllers/parts.controller';
import { Parts } from './models/parts';
import { PartsHistoric } from './models/parts-historic';
import { PartsHistoricService } from './services/parts-historic.service';
import { PartsService } from './services/parts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parts, PartsHistoric]),
    MulterModule.register({
      dest: './images',
    }),
  ],
  providers: [PartsService, PartsHistoricService],
  controllers: [PartsController],
})
export class PartsModule {}
