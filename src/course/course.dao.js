const courses = require('../../database/courses.json');

class CoursesDao {
  constructor() {
    this.courses = courses || [];
  }

  getCourseById(id) {
    return courses.filter(course => course.id === id);
  }

  getCourseByName(name) {
    return courses.filter(course => course.name === name);
  }

  getAllCourses() {
    return courses;
  }

  insertCourse(course) {
    const newCourse = {
      id: this.courses[this.courses.length - 1].id + 1,
      name: course.name
    };
    this.courses.push(newCourse);
    return [newCourse];
  }

  updateCourse(course) {
    const existingCourseIndex = this.courses.findIndex(c => c.id === course.id);
    if (existingCourseIndex === -1) {
      throw new Error(`A course with ID ${course.id} doesn't exist.`);
    }
    this.courses[existingCourseIndex] = course;
    return [course];
  }

  deleteCourse(course) {
    const existingCourseIndex = this.courses.findIndex(c => c.id === course.id);
    if (existingCourseIndex === -1) {
      throw new Error(`A course with ID ${course.id} doesn't exist.`);
    }
    return this.courses.splice(existingCourseIndex, 1);
  }
}

module.exports = {
  CoursesDao: CoursesDao
}