This project is built with [Nest](https://github.com/nestjs/nest) framework.

## Initializing

To create thumbnails i've used npm package `video-thumbnail-generator` which requires `ffmpeg` to be installed.

For MacOS it was enough to:
```
brew install ffmpeg
```
There is also a way to get by without thumbnails.

Once it is ready - init things in common npm project way:
```
npm install
npm start
```

## Test

```
$ npm run test
```
Tests are not numerous.
There are some default dummy NestJS tests (which are created by CLI when you create services/controllers), but i've generalized them with some helper to avoid repetition.
Also i've created a stupid unit test `src/video/video.service.spec.ts` just to show that i've got overall idea of what Jest is about.

## No thumbs
If for some reason it is a problem to have `ffmpeg` installed you can get by patching `src/config.ts` config file setting `createThumbnails` param to `false`. The UI would look lame, there would be 404s for missing thumbnails but overall things would work and you should be fine to play videos.

## 2dos:

### graphQl uploads
I did cheat a little bit.
Occasionally i've come across the repo:
https://github.com/jamesb3ll/mytube-react-graphql
and found out there's a way to hanlde file upload staying within graphQL API

Trying to do something similar i stuck with the fact that currently
'graphql-tools' i am using is not capable of mapping all things for
that upload and i gave up for now
https://www.apollographql.com/docs/apollo-server/data/file-uploads/
https://github.com/apollographql/graphql-tools/issues/671

That is why i just upload files with REST `multipart/form-data` request.

Leftovers of what i tried are in `wrong-way-gql-upload` but again i don't think it is worth seeing.

### security issues
That thumbnail creating lib introduced severe security issues into the project. Since this one is a sample i did not bother solving this problem. In real life if that vulnerability is serious (which may come out of nature of that `ffmpeg` external lib or something) that might be solved by separating thumbnail creation from the server itself, into the lambda or othem microservice, for instance. I mean other thumbnail packages still depend on that lib and might share the same vulnerabilities.

### database
I even forgot i was going to replace inmemory array of videos with some database (initially i was going to use mongo but eventually i just left it as is), got that used to this state of things that even forgot to mention.
