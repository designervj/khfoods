import { useTranslations } from "next-intl";
import { z, type ZodType } from "zod";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterFormSchemaServer = z
  .object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export const useRegisterFormSchema = () => {
  const t = useTranslations("RegisterForm.errors");

  const RegisterFormSchema = z
    .object({
      email: z.string().min(1, t("email-empty")).email(t("email")),
      password: z.string().min(1, t("password")).min(8, t("password-length")),
      confirmPassword: z.string().min(1, t("password"))
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-mismatch"),
      path: ["confirmPassword"]
    });

  const RegisterFormSchemaResolver: ZodType<RegisterFormData> = RegisterFormSchema;

  return { RegisterFormSchema, RegisterFormSchemaResolver };
};
