const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const { CoursesDao } = require('./course.dao');
const coursesDao = new CoursesDao();
const router = express.Router();

function validateCourse(course) {
  return Joi.validate(course, {
    name: Joi.string().min(3).required()
  });
}

function amazingFunction() {
  console.log(`Now I'm a real software engineer with this setup.`);
}

function validateId(course) {
  return Joi.validate(course, {
    id: Joi.number().required()
  });
}

router.get('/api/courses', (req, res) => {
  res.send(coursesDao.getAllCourses());
  res.end();
});

router.get('/api/courses/:id', (req, res) => {
  const { error } = validateId(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  const course = coursesDao.getCourseById(req.body.id).pop();
  return (course) ? res.send(course) : res.status(HttpStatus.NOT_FOUND)
    .send(error.details[0].message);
});

router.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  try {
    const course = coursesDao
      .insertCourse(req.body)
      .pop();
    res.send(course);
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND)
      .send(error.message);
  }
});

router.put('/api/courses/:id', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  try {
    const updatedCourse = coursesDao.updatedCourse(req.body).pop();
    res.send(updatedCourse);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND)
      .send(err.message);
  }
});

router.delete('/api/courses/:id', (req, res) => {
  const { error } = validateId(req.body);
  if (error) {
    return res.status(HttpStatus.NOT_FOUND)
      .send(error.details[0].message);
  }
  try {
    const deletedCourse = coursesDao.deleteCourse(req.body).pop();
    res.send(deletedCourse);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND)
      .send(err.message);
  }
});

module.exports = router;
