import { authenticated } from "@/access/authenticated";
import { courierFields } from "@/fields/courierFields";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const InPostPickup: GlobalConfig = {
  slug: "inpost-pickup",
  label: {
    en: "InPost Pickup",
    zh: "InPost取件"
  },
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Courier integrations",
      zh: "快递集成"
    }
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Parcel lockers 24/7"

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
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated
              },
              required: true,
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
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated
              },
              required: true,
              defaultValue: "https://api-shipx-pl.easypack24.net",
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
                  value: "https://sandbox-api-shipx-pl.easypack24.net"
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
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated
              },
              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled)
              }
            },
            {
              name: "geowidgetToken",
              type: "text",
              label: {
                en: "Geowidget Token"

              },
              access: {
                read: () => true,
                create: authenticated,
                update: authenticated
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
  ],
  hooks: {
    afterChange: [revalidateGlobal]
  }
};
