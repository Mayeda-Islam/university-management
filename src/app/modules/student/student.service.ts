import http from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IPaginationsOptions } from '../../../interfaces/paginations';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilter } from './student.interface';
import { studentSearchableFields } from './student.constant';
import Student from './student.model';

const getAllStudents = async (
  filters: IStudentFilter,
  paginationOptions: IPaginationsOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
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
  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
// const updatedStudent = async (
//   id: string,
//   updatedData: Partial<IStudent>
// ): Promise<IStudent | null> => {
//   const result = await Student.findOneAndUpdate({ _id: id }, updatedData, {
//     new: true,
//   });
//   return result;
// };
const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
export const StudentService = {
  getAllStudents,
  getSingleStudent,
  //   updatedStudent,
  deleteStudent,
};
