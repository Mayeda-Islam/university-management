import http from 'http-status';
import ApiError from '../../../errors/ApiErrors';

import { IPaginationsOptions } from '../../../interfaces/paginations';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  data: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(data)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilter,
  paginationOptions: IPaginationsOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  const academicsDepartmentSearchableFields = ['title', 'code', 'year'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicsDepartmentSearchableFields.map(field => ({
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
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};
const updatedDepartment = async (
  id: string,
  updatedData: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  ).populate('academicFaculty');
  return result;
};
const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updatedDepartment,
  deleteDepartment,
};
