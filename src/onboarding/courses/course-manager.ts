import { ICourse } from './course';
import { HttpUtils } from '../utils/http';
import { HttpRoutes } from '../utils/routes/http-routes';
import logger from '../utils/logger';

export class CourseManager {
  async registerCourse(course: ICourse): Promise<any> {
    const coursesJSON = new HttpUtils().post(
      HttpRoutes.REGISTER_COURSES,
      course,
    );

    logger.info(
      '[Registering course] ' +
        ' : Course => name : ' +
        course.getCourseName() +
        ' | id: ' +
        course.getRoleUuid() +
        ' | guild: ' +
        course.getGuildUuid() +
        '\n',
    );
    return coursesJSON;
  }

  async getCourses(guildUUID: string): Promise<any> {
    return new HttpUtils().get(HttpRoutes.GET_COURSES, guildUUID);
  }
}
