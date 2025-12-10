import { type Field } from "payload";

import { currencyField } from "./currencyField";

export const freeShippingField: Field = {
  name: "freeShipping",
  type: "array",
  label: {
    en: "Free shipping from"

  },
  labels: {
    singular: {
      en: "Price"

    },
    plural: {
      en: "Prices"

    }
  },
  admin: {
    components: {
      RowLabel: "@/components/(ecommerce)/RowLabels/PriceRowLabel#PriceRowLabel"
    }
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "value",
          type: "number",
          label: {
            en: "Price"

          },
          required: true
        },
        currencyField,
      ]
    },
  ]
};
