import { Model, Types } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string | undefined;
  name: UserName;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  gender: 'male' | 'female';
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileImage?: string;
};
export type IStudentFilter = {
  searchTerm: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
export type StudentModel = Model<IStudent, Record<string, unknown>>;
