import { userValidation } from './user.validation';
import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../moddlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createUsereZodShema),
  UserController.createUser
);
export const UserRoutes = router;
