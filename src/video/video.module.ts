import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  imports:[
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [VideoResolver, VideoService],
  controllers: [VideoController],
})
export class VideoModule { }
