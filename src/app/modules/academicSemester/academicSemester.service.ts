import http from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import { IPaginationsOptions } from '../../../interfaces/paginations';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
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
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationsOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const academicsSemesterSearchableFields = ['title', 'code', 'year'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicsSemesterSearchableFields.map(field => ({
        $or: [
          {
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          },
        ],
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicSemester.find(whereConditions)
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

const getSingleSemesters = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updatedSemester = async (
  id: string,
  updatedData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updatedData?.title &&
    updatedData?.code &&
    academicSemesterTitleCodeMapper[updatedData?.title] !== updatedData?.code
  ) {
    throw new ApiError(http.BAD_REQUEST, 'Invalid Semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return result;
};
const deleteSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemesters,
  updatedSemester,
  deleteSemester,
};
