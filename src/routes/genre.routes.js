const Joi = require('joi');

const express = require('express');
const router = express.Router;


function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string().min(3).max(60).required()
  })
}

function setGenreEndpoints(app) {
  router.get('/', (req, res) => {
    res.send(genreDao.getAllGenres());
    res.end();
  });
}

router.get('/:id', (req, res) => {
  const genreId = parseInt(req.params.id);
  try {
    const requestedGenre = genreDao.getGenreById(genreId).pop();
    res.send(requestedGenre);
  } catch (err) {
    res.status(HttpRequest.NOT_FOUND)
      .send(err.message);
  }
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(HttpRequest.BAD_REQUEST)
      .send(error.details[0].message);
  }
  const newGenre = genreDao.insertGenre(req.body).pop();
  res.send(newGenre);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const genreId = parseInt(req.params.id);
  try {
    const deletedGenre = genreDao.deleteGenre(genreId, req.body).pop();
    res.send(deletedGenre);
  } catch (err) {
    res.send(err.message);
  }
});
}

module.exports
