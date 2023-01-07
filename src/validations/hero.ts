import { z } from 'zod';

export const FormSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  house: z.string().min(2).max(20),
  knownAs: z.string().min(2).max(20),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
