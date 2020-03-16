import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import config from '../config';

import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { UploadsController } from './uploads.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: config.uploadPath,
    }),
  ],
  providers: [VideoResolver, VideoService],
  controllers: [VideoController, UploadsController],
})
export class VideoModule { }
