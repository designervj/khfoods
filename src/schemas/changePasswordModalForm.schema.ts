import { useTranslations } from "next-intl";
import { z, type ZodType } from "zod";

export type ChangePasswordModalFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useChangePasswordModalForm = () => {
  const t = useTranslations("Account.settings.password-form.errors");

  const ChangePasswordModalForm = z
    .object({
      oldPassword: z.string().min(1, t("password-length")),
      newPassword: z.string().min(1, t("password-length")).min(8, t("password-length")),
      confirmPassword: z.string().min(1, t("password-length")).min(8, t("password-length"))
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwords-mismatch"),
      path: ["confirmPassword"]
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: t("password-same"),
      path: ["newPassword"]
    });

  const ChangePasswordModalFormResolver: ZodType<ChangePasswordModalFormData> = ChangePasswordModalForm;

  return { ChangePasswordModalForm, ChangePasswordModalFormResolver };
};
