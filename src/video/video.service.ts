import { Injectable } from '@nestjs/common';

import { Video } from './video.model';
import { NewVideoInput } from './dto';

@Injectable()
export class VideoService {
  private idSequence: number;
  private videos: Video[];
  constructor() {
    this.idSequence = 0;
    this.videos = [];
  }

  async create(data: NewVideoInput): Promise<Video> {
    const id = (++this.idSequence).toString();
    const v = {
      id,
      creationDate: new Date(),
      ...data,
    } as Video;

    this.videos.push(v);

    return v;
  }

  async findOneById(id: string): Promise<Video> {
    return this.videos.find(v => v.id === id);
  }

  async findAll(): Promise<Video[]> {
    return this.videos;
  }

  async remove(id: string): Promise<boolean> {
    this.videos = this.videos.filter(v => v.id !== id);
    return true;
  }
}