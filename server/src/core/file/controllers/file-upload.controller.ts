import {
  Controller,
  Post,
  UploadedFile,
  Request,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, pdfFileFilter } from '../models/file-upload';
import { FileService } from '../services/file.service';
import { File } from '../models/file.entity';
import { FileHistoricService } from '../services/file-historic.service';
import { FileHistoric } from '../models/file-historic.entity';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/core/users/services/users/users.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private service: FileService,
    private userService: UsersService,
    private historicService: FileHistoricService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: pdfFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Request() req) {
    let _file = new File();
    let user = await this.userService.findOne(req.user.userId);
    let historic = new FileHistoric();

    _file.filename = file.filename;

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    _file = await this.service.save(_file);

    historic.file = _file;
    historic.modifiedIn = new Date(Date.now());
    historic.message = 'CREATED';
    historic.user = user;

    this.historicService.save(historic);

    return response;
  }
}
