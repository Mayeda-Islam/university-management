import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { NextFunction, Response, Request } from 'express';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../../shared/pick';
import { paginationFields } from '../../../../constants/pagination';

const createAcademicSemester = catchAsync(async (req, res) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Academic semester created successfully',
  //   data: result,
  // });
});

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);
    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AcademicController = {
  createAcademicSemester,
  getAllSemester,
};
