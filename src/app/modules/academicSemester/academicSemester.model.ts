import { Schema, model } from 'mongoose';
import http from 'http-status';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiErrors';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, require: true, enum: academicSemesterTitle },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
);

//handling same year and same semester issue.
//Data->check-? same year and same semester pre hook
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(http.CONFLICT, 'Academic semester is already exist');
  }
  next();
});

// 3. Create a Model.
const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
export default AcademicSemester;
