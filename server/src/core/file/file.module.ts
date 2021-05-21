import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './models/file.entity';
import { FileHistoric } from './models/file-historic.entity';
import { FileHistoricService } from './services/file-historic.service';
import { FileService } from './services/file.service';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { FileController } from './controllers/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './controllers/file-upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([File, FileHistoric]),
    MulterModule.register({
      dest: './files',
    }),
    ProductModule,
    UsersModule,
  ],
  providers: [FileService, FileHistoricService],
  controllers: [FileController, FileUploadController],
})
export class DocumentModule {}
