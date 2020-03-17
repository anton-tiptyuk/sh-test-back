// I know config should be a service in nestjs and i do know how to implement it
// but time is a factor and we don't need to mess up with all the env stuff in this case

const config = {
  uploadPath: `${__dirname}/uploads`,
  externalUploadPath: '/uploads',
  createThumbnails: true,
};

export default config;