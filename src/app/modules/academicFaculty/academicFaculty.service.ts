import http from 'http-status';
import ApiError from '../../../errors/ApiErrors';

import { IPaginationsOptions } from '../../../interfaces/paginations';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { AcademicFaculty } from './academicFaculty.model';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interfaces';

const createFaculty = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(data);
  return result;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationsOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const academicsFacultySearchableFields = ['title', 'code', 'year'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicsFacultySearchableFields.map(field => ({
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updatedFaculty = async (
  id: string,
  updatedData: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return result;
};
const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updatedFaculty,
  deleteFaculty,
};
