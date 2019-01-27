const GenreDao = require('./genre.dao');
const Joi = require('Joi');
const HttpStatus = require('http-status-codes');

class GenreService {
  constructor(genreDao) {
    this.genreDao = genreDao;
  }

  getCourseById(req, res) {
    if (typeof req.body.id !== 'number') {
      return res.status(HttpStatus.BAD_REQUEST)
        .send(`The ID ${req.body.id} is not a number.`);
    }


  }
}

function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string().min(3).required(),
    id: Joi.number().min(0)
  });
}