import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

import config from '../config';
import { createThumb } from '../common/thumbnails';

@Controller()
export class VideoController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('video')
  async uploadFile(@UploadedFile() file: any) {
    const { path, filename }: { path: string, filename: string } = file;

    const thumbnailPath = await createThumb(path);

    return {
      filename: join(config.externalUploadPath, filename),
      thumbnailPath: join(config.externalUploadPath, thumbnailPath),
    };
  }

  @Get('uploads/:fileId')
  async serveUpload(
    @Param('fileId') fileId: string,
    @Res() res: Response
  ): Promise<any> {
    res.sendFile(
      fileId,
      { root: config.uploadPath }
    );
  }
}