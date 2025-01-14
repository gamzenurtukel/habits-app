import { z } from "zod";

export const signInDataSchema = z.object({
  email: z.string().email("email_invalid"),
  password: z
    .string()
    .min(6, "password_min_length_6")
    .max(20, "password_max_length_20"),
  rememberMe: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInDataSchema>;
