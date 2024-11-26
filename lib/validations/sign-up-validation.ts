import { z } from "zod";

export const signUpDataSchema = z.object({
  name: z.string().min(3, "Ad en az 3 karakter olmalıdır."),
  surname: z.string().min(3, "Soyad en az 3 karakter olmalıdır."),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .max(20, "Şifre en fazla 20 karakter olabilir."),

});

export type SignUpFormValues = z.infer<typeof signUpDataSchema>;
