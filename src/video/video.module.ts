import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import config from '../config';

import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { UploadScalar } from './video.upload';

@Module({
  imports: [
    MulterModule.register({
      dest: config.uploadPath,
    }),
  ],
  providers: [VideoResolver, UploadScalar, VideoService],
  controllers: [VideoController],
})
export class VideoModule { }
