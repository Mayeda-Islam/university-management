import { UsersService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import { z } from 'zod'

const createStudent = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;
  const result = await UsersService.createStudent(student, userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});
export const UserController = { createStudent };
