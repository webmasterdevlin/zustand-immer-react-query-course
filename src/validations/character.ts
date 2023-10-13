import { z } from 'zod';

export const CharacterFormSchema = z.object({
  firstName: z.string().min(2, 'First Name must have at least 2 characters').max(20, 'Too many characters'),
  house: z.string().nullable(),
  knownAs: z.string().nullable(),
  lastName: z.string().min(2, 'Last Name must have at least 2 characters').max(20, 'Too many characters'),
});

export type CharacterFormSchemaType = z.infer<typeof CharacterFormSchema>;
