import { useTranslations } from "next-intl";
import { z, type ZodType } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const useLoginFormSchema = () => {
  const t = useTranslations("LoginForm.errors");

  const LoginFormSchema = z.object({
    email: z.string().min(1, t("email-empty")).email(t("email")),
    password: z.string().min(1, t("password"))
  });

  const LoginFormSchemaResolver: ZodType<LoginFormData> = LoginFormSchema;

  return { LoginFormSchema, LoginFormSchemaResolver };
};
