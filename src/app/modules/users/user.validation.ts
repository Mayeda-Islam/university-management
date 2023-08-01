import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUsereZodShema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      contactNo: z.string({
        required_error: 'Contact Number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Father name is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact is required',
        }),
        motherName: z.string({
          required_error: 'Mother contact is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const userValidation = { createUsereZodShema };
