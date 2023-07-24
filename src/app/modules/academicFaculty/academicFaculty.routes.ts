import express from 'express';
import { academicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../moddlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();
router.post(
  '/create-department',
  validateRequest(academicFacultyValidation.createAcAdemicFacultySchema),
  AcademicFacultyController.createFaculty
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.get('/', AcademicFacultyController.getAllFaculties);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.createAcAdemicFacultySchema),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
