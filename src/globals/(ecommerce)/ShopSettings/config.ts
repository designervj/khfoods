import { currencyField } from "@/fields/currencyField";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const ShopSettings: GlobalConfig = {
  slug: "shopSettings",
  label: {
    en: "General",
    zh: "通用"
  },
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Shop settings",
      zh: "商店设置"
    }
  },
  fields: [
    {
      name: "availableCurrencies",
      type: "select",
      label: {
        en: "Available currencies"

      },
      options: [
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
        { value: "GBP", label: "GBP" },
        { value: "PLN", label: "PLN" },
      ],
      admin: {
        description: {
          en: "First currency is the default one"

        }
      },
      hasMany: true,
      required: true
    },
    {
      name: "currencyValues",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            currencyField,
            {
              name: "value",
              type: "number",
              required: true
            },
          ]
        },
      ]
    },
    {
      name: "enableOAuth",
      type: "checkbox",
      label: { en: "Enable OAuth", zh: "启用OAuth" },
      defaultValue: false,
      required: true
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal]
  }
};
