import express from 'express';

import { UserRoutes } from '../users/user.route';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRoutes } from '../academicDepartment/academicDepartment.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
