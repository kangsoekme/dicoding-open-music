const Hapi = require('@hapi/hapi');
const music = require('./api/music');
const album = require('./api/album');
const MusicService = require('./services/postgres/MusicService');
const AlbumService = require('./services/postgres/AlbumService');
const MusicValidator = require('./validator/song');
const ClientError = require('./exception/ClientError');
const AlbumValidator = require('./validator/album');

require('dotenv').config();

const init = async () => {
  const musicService = new MusicService();
  const albumService = new AlbumService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    debug: { request: ['error'] },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: music,
      options: {
        service: musicService,
        validator: MusicValidator,
      },
    },

    {
      plugin: album,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });

        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terdapat kendala',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();
