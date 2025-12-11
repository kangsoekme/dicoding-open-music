const MusicPayloadSchema = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const MusicValidator = {
  validateMusicPayload: (payload) => {
    const validateResult = MusicPayloadSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = MusicValidator;
