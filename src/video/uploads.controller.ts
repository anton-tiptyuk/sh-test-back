import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import config from '../config';

@Controller('uploads')
export class UploadsController {
  @Get('/:fileId')
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
