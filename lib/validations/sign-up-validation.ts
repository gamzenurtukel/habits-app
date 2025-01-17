import { z } from "zod";

export const signUpDataSchema = z.object({
  name: z.string().min(3, "name_min_3_characters"),
  surname: z.string().min(3, "surname_min_3_characters"),
  email: z.string().email("email_invalid"),
  password: z
    .string()
    .min(6, "password_min_length_6")
    .max(20, "password_max_length_20"),
});

export type SignUpFormValues = z.infer<typeof signUpDataSchema>;
