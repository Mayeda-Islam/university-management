import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NextFunction, Response, Request } from 'express';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

import { academicDepartmentFilterableFields } from '../academicDepartment/academicDepartment.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

// const createAcademicStudent = catchAsync(async (req, res) => {
//   const { ...academicStudentData } = req.body;
//   const result = await StudentService.createStudent(
//     academicStudentData
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Student created successfully',
//     data: result,
//   });
// });

const getAllStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions, filters);
    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',

    data: result,
  });
});
const updatedStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updatedStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',

    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',

    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updatedStudent,
  deleteStudent,
};
