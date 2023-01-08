import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv|txt|)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Extensao invalida');
    }
    return await this.appService.fileParse(file);
  }

  @Post('input')
  async input(@Body() input: any) {
    return await this.appService.inputDay1(input);
  }

  @Post('input/day2')
  async inputDay2(@Body() input: any) {
    return await this.appService.inputParseDay2(input);
  }

  @Post('input/day3')
  async inputDay3(@Body() input: any) {
    return await this.appService.inputParseDay3(input);
  }

  @Post('input/day4')
  async inputDay4(@Body() input: any) {
    return await this.appService.inputParseDay4(input);
  }
  
  @Post('input/day5')
  async inputDay5(@Body() input: any) {
    return await this.appService.inputParseDay5(input);
  }
  
}
