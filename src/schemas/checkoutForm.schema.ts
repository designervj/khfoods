import { useTranslations } from "next-intl";
import { z, type ZodType } from "zod";

export const CheckoutFormSchemaServer = z.object({
  buyerType: z.string().nonempty(),
  individualInvoice: z.boolean(),
  invoice: z
    .object({
      name: z.string().nonempty(),
      address: z.string().nonempty(),
      city: z.string().nonempty(),
      country: z.string().nonempty(),
      region: z.string().nonempty(),
      postalCode: z.string().nonempty(),
      tin: z.string().optional(),
    })
    .optional(),
  shipping: z.object({
    id: z.string().optional(),
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
    region: z.string().nonempty(),
    postalCode: z.string().nonempty(),
    phone: z.string().nonempty(),
    email: z.string().nonempty().email(),
    pickupPointID: z.string().optional(),
    pickupPointAddress: z.string().optional(),
  }),
  deliveryMethod: z.string().nonempty(),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchemaServer>;

export const useCheckoutFormSchema = () => {
  const t = useTranslations("CheckoutForm.errors");

  const CheckoutFormSchema = z.object({
    buyerType: z.string().nonempty(),
    individualInvoice: z.boolean(),
    invoice: z
      .object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        country: z.string(),
        region: z.string(),
        postalCode: z.string(),
        tin: z.string().optional(),
      })
      .optional(),
    shipping: z.object({
      id: z.string().optional(),
      name: z.string().nonempty(t("shipping.name")),
      address: z.string().nonempty(t("shipping.address")),
      city: z.string().nonempty(t("shipping.city")),
      country: z.string().nonempty(t("shipping.country")),
      region: z.string().nonempty(t("shipping.region")),
      postalCode: z.string().nonempty(t("shipping.postalCode")),
      phone: z.string().nonempty(t("shipping.phone")),
      email: z
        .string()
        .nonempty(t("shipping.email"))
        .email(t("shipping.email")),
      pickupPointID: z.string().optional(),
      pickupPointAddress: z.string().optional(),
    }),
    deliveryMethod: z.string().nonempty(t("deliveryMethod")),
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
            path: ["invoice", "name"],
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
              path: ["invoice", field],
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
            path: ["invoice", "tin"],
          });
        }
      }
    }
  );

  const CheckoutFormSchemaResolver: ZodType<CheckoutFormData> =
    RefinedCheckoutFormSchema;

  const ShippingSchema = z.object({
    shipping: CheckoutFormSchema.shape.shipping,
  });

  return {
    CheckoutFormSchema: RefinedCheckoutFormSchema,
    CheckoutFormSchemaResolver,
    ShippingFormSchemaResolver: ShippingSchema,
  };
};
