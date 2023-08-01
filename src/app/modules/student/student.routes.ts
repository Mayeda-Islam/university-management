import express from 'express';

import validateRequest from '../../moddlewares/validateRequest';
import { userValidation } from '../users/user.validation';
import { StudentController } from './student.controller';
import { studentValidation } from './student.validation';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updatedStudent
);
router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
