import { Schema, model } from 'mongoose';
import {
  IAcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interfaces';

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  IAcademicFacultyModel
>(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
