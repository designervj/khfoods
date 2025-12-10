import { useTranslations } from "next-intl";
import { z, type ZodType } from "zod";

export const CheckoutFormSchemaServer = z.object({
  buyerType: z.string().min(1),
  individualInvoice: z.boolean(),
  invoice: z
    .object({
      name: z.string().min(1),
      address: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1),
      postalCode: z.string().min(1),
      tin: z.string().optional()
    })
    .optional(),
  shipping: z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().min(1).email(),
    pickupPointID: z.string().optional(),
    pickupPointAddress: z.string().optional()
  }),
  deliveryMethod: z.string().min(1)
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchemaServer>;

export const useCheckoutFormSchema = () => {
  const t = useTranslations("CheckoutForm.errors");

  const CheckoutFormSchema = z.object({
    buyerType: z.string().min(1),
    individualInvoice: z.boolean(),
    invoice: z
      .object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        country: z.string(),
        region: z.string(),
        postalCode: z.string(),
        tin: z.string().optional()
      })
      .optional(),
    shipping: z.object({
      id: z.string().optional(),
      name: z.string().min(1, t("shipping.name")),
      address: z.string().min(1, t("shipping.address")),
      city: z.string().min(1, t("shipping.city")),
      country: z.string().min(1, t("shipping.country")),
      region: z.string().min(1, t("shipping.region")),
      postalCode: z.string().min(1, t("shipping.postalCode")),
      phone: z.string().min(1, t("shipping.phone")),
      email: z
        .string()
        .min(1, t("shipping.email"))
        .email(t("shipping.email")),
      pickupPointID: z.string().optional(),
      pickupPointAddress: z.string().optional()
    }),
    deliveryMethod: z.string().min(1, t("deliveryMethod"))
  });

  const RefinedCheckoutFormSchema = CheckoutFormSchema.superRefine(
    (data, ctx) => {
      // Check if invoice data is needed
      const needsInvoice =
        data.buyerType === "company" || data.individualInvoice;

      if (needsInvoice) {
        // Check if invoice object exists and has required fields
        if (!data.invoice) {
          ctx.addIssue({
            code: "custom",
            message: t("invoice.name"),
            path: ["invoice", "name"]
          });
          return;
        }

        // Validate required invoice fields
        const requiredInvoiceFields = [
          "name",
          "address",
          "city",
          "country",
          "region",
          "postalCode",
        ];

        requiredInvoiceFields.forEach((field) => {
          const value = data.invoice?.[field as keyof typeof data.invoice];
          if (!value || (typeof value === "string" && value.trim() === "")) {
            type invoiceObject = Exclude<
              keyof NonNullable<
                z.infer<typeof CheckoutFormSchemaServer>["invoice"]
              >,
              undefined
            >;
            const typedKey = field as invoiceObject;
            ctx.addIssue({
              code: "custom",
              message: t(`invoice.${typedKey}`),
              path: ["invoice", field]
            });
          }
        });

        // TIN is required for companies
        if (
          data.buyerType === "company" &&
          (!data.invoice.tin || data.invoice.tin.trim() === "")
        ) {
          ctx.addIssue({
            code: "custom",
            message: t("invoice.tin"),
            path: ["invoice", "tin"]
          });
        }
      }
    }
  );

  const CheckoutFormSchemaResolver: ZodType<CheckoutFormData> =
    RefinedCheckoutFormSchema;

  const ShippingSchema = z.object({
    shipping: CheckoutFormSchema.shape.shipping
  });

  return {
    CheckoutFormSchema: RefinedCheckoutFormSchema,
    CheckoutFormSchemaResolver,
    ShippingFormSchemaResolver: ShippingSchema
  };
};
