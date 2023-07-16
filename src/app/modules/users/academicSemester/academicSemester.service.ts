import http from 'http-status';
import ApiError from '../../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import { IPaginationsOptions } from '../../../../interfaces/paginations';
import { IGenericResponse } from '../../../../interfaces/common';
import { paginationHelpers } from '../../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  data: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(http.BAD_REQUEST, 'Invalid Semester code');
  }
  const result = await AcademicSemester.create(data);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationsOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
