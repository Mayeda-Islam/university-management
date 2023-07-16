import express from 'express';
import { academicSemesterValidation } from './academicSemester.zodValidation';
import validateRequest from '../../../moddlewares/validateRequest';
import { AcademicController } from './academicSemester.controller';
const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  AcademicController.createAcademicSemester
);
router.get('/', AcademicController.getAllSemester);

export const AcademicSemesterRoutes = router;
