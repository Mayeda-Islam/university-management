import { IStudent } from './../student/student.interface';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import AcademicSemester from '../academicSemester/academicSemester.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // const id = await generateStudentId();
  // user.id = id;
  //default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  const id = await generateStudentId(academicSemester);

  const createUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to  user!');
  }
  return createUser;
};

export const UsersService = {
  createStudent,
};
