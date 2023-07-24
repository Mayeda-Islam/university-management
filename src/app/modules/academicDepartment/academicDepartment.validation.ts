import { z } from 'zod';
const createAcAdemicDepartmentSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});
export const academicDepartmentValidation = {
  createAcAdemicDepartmentSchema,
  updateAcademicDepartmentZodSchema,
};
