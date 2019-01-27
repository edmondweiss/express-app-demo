const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const coursesController = require('./course/course.controller');
const genresController = require('./genre/genre.controller');
const logger = require('./middleware/logger');
const genres = require('./routes/genre.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(helmet());
app.use('api/genres', genres)
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

console.log(`App name ${config.get('name')}`);
log

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
  res.end();
});

coursesController.setCourseEndpoints(app);
genresController.setGenreEndpoints(app);


const server = app.listen(PORT);

module.exports.app = app;
