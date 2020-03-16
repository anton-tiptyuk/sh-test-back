import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import config from '../config';

import { Video } from './video.model';
import { NewVideoInput } from './dto';

const mockVids: NewVideoInput[] = [
  {
    title: 'sample video',
    filename: 'any',
    uploadPath: 'wrongPath',
    thumbnailPath: 'wrongThumbPath',
  },
  {
    title: 'another video',
    filename: 'differentFile',
    uploadPath: 'wrongPath',
    thumbnailPath: 'wrongThumbPath',
    description: 'description is present',
  },
];

@Injectable()
export class VideoService {
  private idSequence: number;
  private videos: Video[];
  constructor() {
    this.idSequence = 0;
    this.videos = [];

    this.createMocks();
  }

  async createMocks() {
    let i = 0;
    while (i < mockVids.length) {
      await this.create(mockVids[i]);
      ++i;
    }
  }

  async create(data: NewVideoInput): Promise<Video> {
    const { uploadPath, ...videoData } = data;

    const id = (++this.idSequence).toString();
    const v = {
      id,
      path: uploadPath,
      creationDate: new Date(),
      ...videoData,
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
    const v = this.videos.find(v => v.id === id);
    if (v) {
      this.videos = this.videos.filter(v => v.id !== id);
      const filePath = path.join(config.uploadPath, v.path);
      if (fs.existsSync(filePath))
        fs.unlinkSync(filePath);
      return true;
    } else
      return false;
  }
}