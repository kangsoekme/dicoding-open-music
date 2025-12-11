const albumMapModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const songMapModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

module.exports = { albumMapModel, songMapModel };
