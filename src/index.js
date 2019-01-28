const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const homeRoutes = require('./modules/home/home.routes')
const courseRoutes = require('./modules/course/courses.routes');
const genreRoutes = require('./modules/genre/genre.routes');
const app = express();

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(helmet());
app.use('/', homeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/genres', genreRoutes);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

module.exports.app = app;
