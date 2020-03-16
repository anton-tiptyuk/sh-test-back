import ThumbnailGenerator from 'video-thumbnail-generator';
import config from '../config';

export const createThumb = async (sourcePath: string): Promise<string> => {
  const tg = new ThumbnailGenerator({
    sourcePath,
    thumbnailPath: config.uploadPath,
  });

  return tg.generateOneByPercent(7);
}

