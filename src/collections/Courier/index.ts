import { authenticated } from "@/access/authenticated";
import { courierFields } from "@/fields/courierFields";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { CollectionConfig } from "payload";

export const Courier: CollectionConfig = {
  slug: "courier",
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Courier integrations",
      zh: "快递集成"
    },
    useAsTitle: "website"
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "InPost Courier"

          },
          fields: courierFields
        },
        {
          label: {
            en: "API Keys"

          },
          fields: [
            {
              name: "clientId",
              type: "text",
              label: {
                en: "Client ID"

              },

              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled)
              }
            },
            {
              name: "accountnumber",
              type: "text",
              label: {
                en: "Account Number"

              },
              admin: {
                condition: (data) => Boolean(data.enabled)
              }
            },
            {
              name: "APIUrl",
              type: "select",
              label: {
                en: "Environment"

              },

              required: true,
              defaultValue: "https://apis-sandbox.fedex.com",
              options: [
                {
                  label: {
                    en: "Production"

                  },
                  value: "https://api-shipx-pl.easypack24.net"
                },
                {
                  label: {
                    en: "Sandbox"

                  },
                  value: "https://apis-sandbox.fedex.com"
                },
              ],
              admin: {
                condition: (data) => Boolean(data.enabled),
                description: {
                  en: "Remember to pass matching keys for choosen environment"

                }
              }
            },
            {
              name: "shipXAPIKey",
              type: "text",
              label: {
                en: "API ShipX key"

              },
              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled)
              }
            },
            {
              name: "shipSecretKey",
              type: "text",
              label: {
                en: "Secret ShipX key"

              },

              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled)
              }
            },
          ]
        },
      ]
    },
    {
      name: "website",
      type: "relationship",
      relationTo: "websites",
      admin: {
        position: "sidebar"
      }
    },
  ]
};
