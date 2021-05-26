import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { FileService } from '../services/file.service';
import { File } from '../models/file.entity';
import { FileHistoricService } from '../services/file-historic.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/core/users/services/users/users.service';
import { FileHistoric } from '../models/file-historic.entity';

@Controller('api/file')
export class FileController {
  constructor(
    private fileService: FileService,
    private userService: UsersService,
    private historicService: FileHistoricService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('getFile/:filename')
  getFile(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(filename, { root: './files' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getFilesNotLinked')
  async getAllFilesNotLinked() {
    return this.fileService.findAllFilesNotLinked();
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateFile(@Body() file: File, @Res() req) {
    this.fileService.updateEntity(file);

    let historic = new FileHistoric();
    historic.user = await this.userService.findOne(req.user.userId);
    historic.message = 'UPDATED';
    historic.modifiedIn = new Date(Date.now());
    historic.file = file;

    await this.historicService.save(historic);

    const response = `File #${file.filename} was updated`;
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAllFiles() {
    return this.fileService.findAllWithRelations();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTMOs')
  async getTMOs() {
    return this.fileService.getFileByKind(0);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOperators')
  async getOperators() {
    return this.fileService.getFileByKind(1);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCatalogs')
  async getCatalogs() {
    return this.fileService.getFileByKind(2);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getReportCards')
  async getReportCards() {
    return this.fileService.getFileByKind(3);
  }
}
