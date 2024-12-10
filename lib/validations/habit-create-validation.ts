import { z } from "zod";

export const habitCreateDataSchema = z.object({
  name: z.string().min(3, "Başlık en az 3 karakter olmalıdır."),
  description: z.string().min(3, "Açıklama en az 3 karakter olmalıdır."),
  isReminder: z.boolean(),
  details: z.object({
    color: z.string().min(3, "Lütfen renk seçiniz."),
    icon: z.string().min(3, "Lütfen ikon seçiniz."),
  }),
});
