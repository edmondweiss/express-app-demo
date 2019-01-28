const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const { CourseDao } = require('./course.dao');
const express = require('express');
const router = express.Router();

const courseDao = new CourseDao();

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

router.get('/', (req, res) => {
  res.send(courseDao.getAllCourses());
  res.end();
});

router.get('/:id', (req, res) => {
  const { error } = validateId(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  const course = courseDao.getCourseById(req.body.id).pop();
  return (course) ? res.send(course) : res.status(HttpStatus.NOT_FOUND)
    .send(error.details[0].message);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  try {
    const course = courseDao
      .insertCourse(req.body)
      .pop();
    res.send(course);
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND)
      .send(error.message);
  }
});

router.put('/:id', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST)
      .send(error.details[0].message);
  }
  try {
    const updatedCourse = courseDao.updatedCourse(req.body).pop();
    res.send(updatedCourse);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND)
      .send(err.message);
  }
});

router.delete('/:id', (req, res) => {
  const { error } = validateId(req.body);
  if (error) {
    return res.status(HttpStatus.NOT_FOUND)
      .send(error.details[0].message);
  }
  try {
    const deletedCourse = courseDao.deleteCourse(req.body).pop();
    res.send(deletedCourse);
  } catch (err) {
    res.status(HttpStatus.NOT_FOUND)
      .send(err.message);
  }
});

module.exports = router;
