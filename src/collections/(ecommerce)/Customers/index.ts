import { revalidateTag } from "next/cache";
import { type CollectionConfig } from "payload";

import { superAdminOnlyAdmin } from "@/access/roleBasedAccess";
import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";

import { createTokenAndSendEmail } from "./hooks/createTokenAndSendEmail";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    admin: superAdminOnlyAdmin,
    create: () => true
  },
  labels: {
    singular: {
      en: "Customer",
      zh: "客户",
      hr: "Kupac", // Croatian
    },
    plural: {
      en: "Customers list",
      zh: "客户列表",
      hr: "Popis kupaca", // Croatian
    }
  },
  admin: {
      group: {
        en: "Customer Management",
        zh: "客户管理",
        hr: "Upravljanje kupcima", // Croatian
      },
    defaultColumns: ["fullName", "email", "createdAt", "updatedAt"],
    useAsTitle: "fullName"
  },
  auth: {
    maxLoginAttempts: 30,
    lockTime: 30 * 1000,
    verify: true
  },
  hooks: {
    afterOperation: [createTokenAndSendEmail],
    afterLogin: [
      async () => {
        revalidateTag("user-auth");
      },
    ],
    beforeChange: [
      async ({ data }) => {
        return { ...data, fullName: `${data.firstName} ${data.lastName}` };
      },
    ]
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      admin: {
        hidden: true
      },
      // virtual: true
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: {
            en: "First Name",

            hr: "Ime", // Croatian
          },
          type: "text"
        },
        {
          name: "lastName",
          label: {
            en: "Last Name",

            hr: "Prezime", // Croatian
          },
          type: "text"
        },
      ]
    },
    {
      type: "row",
      fields: [
        {
          name: "birthDate",
          label: {
            en: "Birth Date",

            hr: "Datum rođenja", // Croatian
          },
          type: "date",
          admin: {
            width: "50%"
          }
        },
        {
          name: "lastBuyerType",
          label: {
            en: "Last Buyer Type",

            hr: "Zadnji tip kupca", // Croatian
          },
          type: "select",
          admin: {
            width: "50%"
          },
          options: [
            { value: "individual", label: { en: "Individual", zh: "个人", hr: "Pojedinac" } },
            { value: "company", label: { en: "Company", zh: "公司", hr: "Tvrtka" } },
          ]
        },
      ]
    },
    {
      name: "shippings",
      type: "array",
      label: {
        en: "Shipping adresses",

        hr: "Adrese za dostavu", // Croatian
      },
      labels: {
        singular: {
          en: "Shipping address",

          hr: "Adresa za dostavu", // Croatian
        },
        plural: {
          en: "Shipping addresses",

          hr: "Adrese za dostavu", // Croatian
        }
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel:
            "@/collections/(ecommerce)/Customers/ui/RowLabels/ShippingAddressRowLabel#ShippingAddressRowLabel"
        }
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name",

            hr: "Naziv", // Croatian
          },
          required: true
        },
        {
          name: "address",
          type: "text",
          label: {
            en: "Address",

            hr: "Adresa", // Croatian
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
                en: "City",

                hr: "Grad", // Croatian
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
                en: "Country",

                hr: "Država", // Croatian
              },
              admin: {
                width: "50%"
              },
              options: [...countryList],
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
                en: "Region",

                hr: "Regija", // Croatian
              },
              required: true
            },
            {
              name: "postalCode",
              type: "text",
              label: {
                en: "Postal Code",

                hr: "Poštanski broj", // Croatian
              },
              required: true
            },
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "phone",
              type: "text",
              label: {
                en: "Phone",

                hr: "Telefon", // Croatian
              },
              required: true
            },
            {
              name: "email",
              type: "text",
              label: {
                en: "Email",

                hr: "Email", // Croatian
              },
              required: true
            },
          ]
        },
        {
          name: "default",
          type: "checkbox",
          label: {
            en: "Default",

            hr: "Zadano", // Croatian
          },
          defaultValue: false
        },
      ]
    },
    {
      name: "orders",
      label: {
        en: "Client Orders",

        hr: "Narudžbe klijenta", // Croatian
      },
      type: "join",
      collection: "orders",
      on: "customer"
    },
    {
      name: "cart",
      type: "json",
      label: {
        en: "Cart",

        hr: "Košarica", // Croatian
      },
      admin: {
        hidden: true
      }
    },
    {
      name: "wishlist",
      type: "json",
      label: {
        en: "Wishlist",

        hr: "Popis želja", // Croatian
      },
      admin: {
        hidden: true
      }
    },
  ]
};
