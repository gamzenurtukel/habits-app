import { z } from "zod";

export const signInDataSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .max(20, "Şifre en fazla 20 karakter olabilir."),
});

export type SignInFormValues = z.infer<typeof signInDataSchema>;
