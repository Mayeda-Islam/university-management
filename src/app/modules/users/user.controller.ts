import { UsersService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import { z } from 'zod'

const createUser = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await UsersService.createUser(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});
export const UserController = { createUser };
