import z from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';

const createAcademicSemesterSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum(
      //enum always thakbe,baki gular type declair kore dewa holo
      [...academicSemesterMonths] as [string, ...string[]],
      {
        required_error: 'Start of the month is required',
      }
    ),
    endMonth: z.enum(
      //enum always thakbe,baki gular type declair kore dewa holo
      [...academicSemesterMonths] as [string, ...string[]],
      {
        required_error: 'End of the month is required',
      }
    ),
  }),
});

const updateAcademicSemesterSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),

      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),

      code: z
        .enum([...academicSemesterCode] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum(
          //enum always thakbe,baki gular type declair kore dewa holo
          [...academicSemesterMonths] as [string, ...string[]],
          {
            required_error: 'Start of the month is required',
          }
        )
        .optional(),
      endMonth: z
        .enum(
          //enum always thakbe,baki gular type declair kore dewa holo
          [...academicSemesterMonths] as [string, ...string[]],
          {
            required_error: 'End of the month is required',
          }
        )
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );
export const academicSemesterValidation = {
  createAcademicSemesterSchema,
  updateAcademicSemesterSchema,
};
