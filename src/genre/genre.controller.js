const Joi = require('joi');
const GenreDao = require('./genre.dao');
const HttpRequest = require('http-status-codes');

const genreDao = new GenreDao();

function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string().min(3).max(60).required()
  })
}

function setGenreEndpoints(app) {
  app.get('/api/genres', (req, res) => {
    res.send(genreDao.getAllGenres());
    res.end();
  });

  app.get('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    try {
      const requestedGenre = genreDao.getGenreById(genreId).pop();
      res.send(requestedGenre);
    } catch (err) {
      res.status(HttpRequest.NOT_FOUND)
        .send(err.message);
    }
  });

  app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(HttpRequest.BAD_REQUEST)
        .send(error.details[0].message);
    }
    const newGenre = genreDao.insertGenre(req.body).pop();
    res.send(newGenre);
  });

  app.put('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(HttpRequest.BAD_REQUEST)
        .send(error.details[0].message);
    }
    try {
      const updatedGenre = genreDao.updateGenre(genreId, req.body).pop();
      res.send(updatedGenre);
    } catch (err) {
      res.send(err.message);
    }
  });

  app.delete('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    try {
      const deletedGenre = genreDao.deleteGenre(genreId, req.body).pop();
      res.send(deletedGenre);
    } catch (err) {
      res.send(err.message);
    }
  });
}

module.exports = {
  setGenreEndpoints: setGenreEndpoints
}