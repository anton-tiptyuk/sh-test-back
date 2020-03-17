import { VideoService } from './video.service';

const fakeCurrentDate = new Date('2020-03-17T13:02:16Z');

class DateFaker extends Date {
  constructor(date: Date) {
    super(date);
    if (!date) return fakeCurrentDate;
  }
}

describe('video service unit test', () => {
  beforeAll(() => {
    (<any>global).Date = DateFaker;
  });

  it('lists dummy videos', () => {
    const videoService = new VideoService();
    expect(videoService.findAll()).resolves.toMatchInlineSnapshot(`
      Array [
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "filename": "any",
          "id": "1",
          "path": "wrongPath",
          "thumbnailPath": "wrongThumbPath",
          "title": "sample video",
        },
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "description": "description is present",
          "filename": "differentFile",
          "id": "2",
          "path": "wrongPath",
          "thumbnailPath": "wrongThumbPath",
          "title": "another video",
        },
      ]
    `);
  });

  it('removes videos', async () => {
    const videoService = new VideoService();
    expect(await videoService.remove('1')).toBe(true);
    expect(await videoService.remove('1')).toBe(false);
    expect(videoService.findAll()).resolves.toMatchInlineSnapshot(`
      Array [
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "description": "description is present",
          "filename": "differentFile",
          "id": "2",
          "path": "wrongPath",
          "thumbnailPath": "wrongThumbPath",
          "title": "another video",
        },
      ]
    `);
  });

  it('adds videos', async () => {
    const fakeInput = {
      title: 'fake title',
      filename: 'test filename',
      uploadPath: 'fake/upload/path',
      thumbnailPath: 'fake/thumb/path',
      description: 'fake video description',
    };

    const videoService = new VideoService();
    expect(videoService.create(fakeInput)).toMatchInlineSnapshot(`
      Object {
        "creationDate": 2020-03-17T13:02:16.000Z,
        "description": "fake video description",
        "filename": "test filename",
        "id": "3",
        "path": "fake/upload/path",
        "thumbnailPath": "fake/thumb/path",
        "title": "fake title",
      }
    `);
    expect(await videoService.findAll()).toMatchInlineSnapshot(`
      Array [
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "filename": "any",
          "id": "1",
          "path": "wrongPath",
          "thumbnailPath": "wrongThumbPath",
          "title": "sample video",
        },
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "description": "description is present",
          "filename": "differentFile",
          "id": "2",
          "path": "wrongPath",
          "thumbnailPath": "wrongThumbPath",
          "title": "another video",
        },
        Object {
          "creationDate": 2020-03-17T13:02:16.000Z,
          "description": "fake video description",
          "filename": "test filename",
          "id": "3",
          "path": "fake/upload/path",
          "thumbnailPath": "fake/thumb/path",
          "title": "fake title",
        },
      ]
    `);
  });

  it('finds video by id', async () => {
    const videoService = new VideoService();
    expect(await videoService.findOneById('2')).toMatchInlineSnapshot(`
      Object {
        "creationDate": 2020-03-17T13:02:16.000Z,
        "description": "description is present",
        "filename": "differentFile",
        "id": "2",
        "path": "wrongPath",
        "thumbnailPath": "wrongThumbPath",
        "title": "another video",
      }
    `);
    expect(await videoService.findOneById('1')).toMatchInlineSnapshot(`
      Object {
        "creationDate": 2020-03-17T13:02:16.000Z,
        "filename": "any",
        "id": "1",
        "path": "wrongPath",
        "thumbnailPath": "wrongThumbPath",
        "title": "sample video",
      }
    `);
    expect(
      await videoService.findOneById('absent entry'),
    ).toMatchInlineSnapshot(`undefined`);
  });
});
