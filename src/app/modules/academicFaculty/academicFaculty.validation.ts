import { z } from 'zod';
const createAcAdemicFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
export const academicFacultyValidation = {
  createAcAdemicFacultySchema,
  updateAcademicFacultyZodSchema,
};
