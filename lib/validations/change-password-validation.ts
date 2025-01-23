import { z } from "zod";

export const changePasswordDataSchema = z.object({
  currentPassword: z.string().min(6, "password_min_length_6"),
  newPassword: z
    .string()
    .min(6, "password_min_length_6")
    .max(20, "password_max_length_20"),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordDataSchema>;
