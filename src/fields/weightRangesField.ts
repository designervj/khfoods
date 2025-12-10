import { type Field } from "payload";

import { currencyField } from "./currencyField";

export const weightRangesField: Field = {
  name: "range",
  type: "array",
  label: {
    en: "Weight ranges"

  },
  labels: {
    plural: {
      en: "Weight ranges"

    },
    singular: {
      en: "Weight range"

    }
  },
  admin: {
    components: {
      RowLabel: "@/components/(ecommerce)/RowLabels/WeightRangeRowLabel#WeightRangeRowLabel"
    }
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "weightFrom",
          label: {
            en: "Weight from (g)"

          },
          type: "number",
          required: true
        },
        {
          name: "weightTo",
          label: {
            en: "Weight to (g)"

          },
          type: "number",
          required: true
        },
      ]
    },
    {
      name: "pricing",
      type: "array",
      label: {
        en: "Pricing"

      },
      minRows: 1,
      required: true,
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
    },
  ]
};
