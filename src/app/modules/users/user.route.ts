import { userValidation } from './user.validation';
import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../moddlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createUsereZodShema),
  UserController.createStudent
);
export const UserRoutes = router;
