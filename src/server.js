const Hapi = require('@hapi/hapi');
const music = require('./api/music');
const OpenMusicService = require('./services/postgres/OpenMusicService');
const MusicValidator = require('./validator/music');
const ClientError = require('./exception/ClientError');

require('dotenv').config();

const init = async () => {
  const openMusicService = new OpenMusicService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: music,
    options: {
      service: openMusicService,
      validator: MusicValidator,
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (request instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();
