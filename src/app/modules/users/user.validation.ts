import { z } from 'zod';

const createUsereZodShema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is error',
    }),
    password: z.string().optional(),
  }),
});
export const userValidation = { createUsereZodShema };
