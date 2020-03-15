import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { VideoModule } from './video/video.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
