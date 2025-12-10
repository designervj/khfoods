import { type GlobalConfig } from "payload";

import { countryList } from "../Couriers/utils/countryList";

export const Fulfilment: GlobalConfig = {
  slug: "fulfilment",
  admin: {
    group: {
      en: "Orders",
      zh: "订单"
    }
  },
  label: {
    en: "Fulfilment data",
    zh: "履行数据"
  },
  fields: [
    {
      name: "shopAddress",
      type: "group",
      label: {
        en: "Shop Address"

      },
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name"

          },
          required: true
        },
        {
          name: "address",
          type: "text",
          label: {
            en: "Address"

          },
          required: true
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              label: {
                en: "City"

              },
              admin: {
                width: "50%"
              },
              required: true
            },
            {
              name: "country",
              type: "select",
              label: {
                en: "Country"

              },
              options: [...countryList],
              admin: {
                width: "50%"
              },
              required: true
            },
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "region",
              type: "text",
              label: {
                en: "Region"

              },
              admin: {
                width: "50%"
              },
              required: true
            },
            {
              name: "postalCode",
              type: "text",
              label: {
                en: "Postal Code"

              },
              admin: {
                width: "50%"
              },
              required: true
            },
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "email",
              type: "text",
              label: {
                en: "Email"

              },
              admin: {
                width: "50%"
              },
              required: true
            },
            {
              name: "phone",
              type: "text",
              label: {
                en: "Phone number"

              },
              admin: {
                width: "50%"
              },
              required: true
            },
          ]
        },
      ]
    },
  ]
};
