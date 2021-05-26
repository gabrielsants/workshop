import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import {
  editFileName,
  imageFileFilter,
} from 'src/core/file/models/file-upload';
import { UsersService } from 'src/core/users/services/users/users.service';
import { Parts } from '../models/parts';
import { PartsHistoric } from '../models/parts-historic';
import { PartsHistoricService } from '../services/parts-historic.service';
import { PartsService } from '../services/parts.service';

@Controller('api/parts')
export class PartsController {
  constructor(
    private partsService: PartsService,
    private historicService: PartsHistoricService,
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':imgname')
  getImage(@Param('imgname') imgname: string, @Res() res) {
    return res.sendFile(imgname, { root: './images' });
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updatePars(@Body() parts: Parts, @Res() req) {
    this.partsService.updateEntity(parts);

    let historic = new PartsHistoric();
    historic.user = await this.userService.findOne(req.user.userId);
    historic.message = 'UPDATED';
    historic.modifiedIn = new Date(Date.now());
    historic.part = parts;

    await this.historicService.save(historic);

    return `Pars #${parts.name} was updated`;
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async upload(@UploadedFile() file, @Request() req) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    let parts = new Parts();
    parts.name = file.filename;

    this.partsService.save(parts);

    let historic = new PartsHistoric();
    historic.user = await this.userService.findOne(req.user.userId);
    historic.message = 'CREATED';
    historic.modifiedIn = new Date(Date.now());
    historic.part = parts;

    return response;
  }
}
