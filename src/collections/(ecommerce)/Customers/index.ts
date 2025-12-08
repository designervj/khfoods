import { revalidateTag } from "next/cache";
import { type CollectionConfig } from "payload";

import { superAdminOnlyAdmin } from "@/access/roleBasedAccess";
import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";

import { createTokenAndSendEmail } from "./hooks/createTokenAndSendEmail";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    admin: superAdminOnlyAdmin,
    create: () => true,
  },
  labels: {
    singular: {
      en: "Customer",
      pl: "Klient",
      hr: "Kupac", // Croatian
    },
    plural: {
      en: "Customers list",
      pl: "Lista Klientów",
      hr: "Popis kupaca", // Croatian
    },
  },
  admin: {
      group: {
        en: "Customer Management",
        pl: "Zarządzanie Klientami",
        hr: "Upravljanje kupcima", // Croatian
      },
    defaultColumns: ["fullName", "email", "createdAt", "updatedAt"],
    useAsTitle: "fullName",
  },
  auth: {
    maxLoginAttempts: 30,
    lockTime: 30 * 1000,
    verify: true,
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
    ],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      admin: {
        hidden: true,
      },
      // virtual: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: {
            en: "First Name",
            pl: "Imię",
            hr: "Ime", // Croatian
          },
          type: "text",
        },
        {
          name: "lastName",
          label: {
            en: "Last Name",
            pl: "Nazwisko",
            hr: "Prezime", // Croatian
          },
          type: "text",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "birthDate",
          label: {
            en: "Birth Date",
            pl: "Data urodzenia",
            hr: "Datum rođenja", // Croatian
          },
          type: "date",
          admin: {
            width: "50%",
          },
        },
        {
          name: "lastBuyerType",
          label: {
            en: "Last Buyer Type",
            pl: "Ostatni typ kupującego",
            hr: "Zadnji tip kupca", // Croatian
          },
          type: "select",
          admin: {
            width: "50%",
          },
          options: [
            { value: "individual", label: { en: "Individual", pl: "Osoba fizyczna", hr: "Pojedinac" } },
            { value: "company", label: { en: "Company", pl: "Firma", hr: "Tvrtka" } },
          ],
        },
      ],
    },
    {
      name: "shippings",
      type: "array",
      label: {
        en: "Shipping adresses",
        pl: "Adresy dostaw",
        hr: "Adrese za dostavu", // Croatian
      },
      labels: {
        singular: {
          en: "Shipping address",
          pl: "Adres dostawy",
          hr: "Adresa za dostavu", // Croatian
        },
        plural: {
          en: "Shipping addresses",
          pl: "Adresy dostaw",
          hr: "Adrese za dostavu", // Croatian
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel:
            "@/collections/(ecommerce)/Customers/ui/RowLabels/ShippingAddressRowLabel#ShippingAddressRowLabel",
        },
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name",
            pl: "Nazwa",
            hr: "Naziv", // Croatian
          },
          required: true,
        },
        {
          name: "address",
          type: "text",
          label: {
            en: "Address",
            pl: "Adres",
            hr: "Adresa", // Croatian
          },
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              label: {
                en: "City",
                pl: "Miasto",
                hr: "Grad", // Croatian
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
            {
              name: "country",
              type: "select",
              label: {
                en: "Country",
                pl: "Kraj",
                hr: "Država", // Croatian
              },
              admin: {
                width: "50%",
              },
              options: [...countryList],
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "region",
              type: "text",
              label: {
                en: "Region",
                pl: "Region",
                hr: "Regija", // Croatian
              },
              required: true,
            },
            {
              name: "postalCode",
              type: "text",
              label: {
                en: "Postal Code",
                pl: "Kod pocztowy",
                hr: "Poštanski broj", // Croatian
              },
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "phone",
              type: "text",
              label: {
                en: "Phone",
                pl: "Telefon",
                hr: "Telefon", // Croatian
              },
              required: true,
            },
            {
              name: "email",
              type: "text",
              label: {
                en: "Email",
                pl: "Email",
                hr: "Email", // Croatian
              },
              required: true,
            },
          ],
        },
        {
          name: "default",
          type: "checkbox",
          label: {
            en: "Default",
            pl: "Domyślny",
            hr: "Zadano", // Croatian
          },
          defaultValue: false,
        },
      ],
    },
    {
      name: "orders",
      label: {
        en: "Client Orders",
        pl: "Zamówienia klienta",
        hr: "Narudžbe klijenta", // Croatian
      },
      type: "join",
      collection: "orders",
      on: "customer",
    },
    {
      name: "cart",
      type: "json",
      label: {
        en: "Cart",
        pl: "Koszyk",
        hr: "Košarica", // Croatian
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "wishlist",
      type: "json",
      label: {
        en: "Wishlist",
        pl: "Lista życzeń",
        hr: "Popis želja", // Croatian
      },
      admin: {
        hidden: true,
      },
    },
  ],
};
