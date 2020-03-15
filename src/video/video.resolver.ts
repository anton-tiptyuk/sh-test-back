import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Video } from './video.model';
import { NewVideoInput } from './dto';

import { VideoService } from './video.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) { }

  @Query(() => Video)
  async video(@Args('id') id: string): Promise<Video> {
    const v = await this.videoService.findOneById(id);
    if (!v)
      throw new NotFoundException(id);
    return v;
  }

  @Query(() => [Video])
  videos(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Mutation(() => Video)
  async addVideo(
    @Args('newVideoData') data: NewVideoInput,
  ): Promise<Video> {
    return this.videoService.create(data);
  }

  @Mutation(() => Boolean)
  async removeVideo(@Args('id') id: string) {
    return this.videoService.remove(id);
  }
}
