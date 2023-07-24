import express from 'express';
import { academicSemesterValidation } from './academicSemester.zodValidation';
import validateRequest from '../../moddlewares/validateRequest';
import { AcademicController } from './academicSemester.controller';
const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  AcademicController.createAcademicSemester
);
router.get('/:id', AcademicController.getSingleSemester);
router.get('/', AcademicController.getAllSemester);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
  AcademicController.updateSemeseter
);
router.delete('/:id', AcademicController.deleteSemester);

export const AcademicSemesterRoutes = router;
