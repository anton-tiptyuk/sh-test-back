import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

import config from '../config';
import { createThumb } from '../common/thumbnails';

// I did cheat a little bit.
// Occasionally i've come across the repo:
// https://github.com/jamesb3ll/mytube-react-graphql
// and found out there's a way to hanlde file upload
// staying within graphQL API

// Trying to do something similar i stuck with the fact that currently
// 'graphql-tools' i am using is not capable of mapping all things for
// that upload and i gave up for now
// https://www.apollographql.com/docs/apollo-server/data/file-uploads/
// https://github.com/apollographql/graphql-tools/issues/671

@Controller('video')
export class VideoController {
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: any) {
    const { path, filename }: { path: string, filename: string } = file;

    const thumbnailPath = await createThumb(path);

    return {
      filename: join(config.externalUploadPath, filename),
      thumbnailPath: join(config.externalUploadPath, thumbnailPath),
    };
  }

}
