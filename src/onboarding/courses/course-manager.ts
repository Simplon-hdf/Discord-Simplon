import { Course } from './course';

export class CourseManager {
  private _courses?: Course;

  setCourse(course: Course): void {
    this._courses = course;
  }

  getCourse(): Course | undefined {
    return this._courses;
  }
}
