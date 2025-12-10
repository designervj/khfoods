import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const Paywalls: GlobalConfig = {
  slug: "paywalls",
  label: {
    en: "Paywalls"

  },
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Payments settings"

    }
  },
  fields: [
    {
      name: "paywall",
      label: {
        en: "Paywall"

      },
      type: "select",
      options: [
        {
          label: {
            en: "Stripe"

          },
          value: "stripe"
        },
        {
          label: {
            en: "Autopay"

          },
          value: "autopay"
        },
        {
          label: {
            en: "Przelewy24"

          },
          value: "p24"
        },
      ],
      defaultValue: "stripe",
      required: true
    },
    {
      name: "stripe",
      label: {
        en: "Stripe configuration"

      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "stripe";
        },
        description: {

          en: "If you want to use test environment, you can also provide test keys here."
        }
      },
      fields: [
        {
          name: "secret",
          type: "text",
          label: {
            en: "Secret API Key"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "webhookSecret",
          type: "text",
          label: {
            en: "Webhook Secret API Key"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "public",
          type: "text",
          label: {
            en: "Public API Key"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          }
        },
      ]
    },
    {
      name: "autopay",
      label: {
        en: "Autopay configuration"

      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "autopay";
        },
        description: {

          en: "If you want to use test environment, you can also provide test keys here."
        }
      },
      fields: [
        {
          name: "serviceID",
          type: "text",
          label: {
            en: "Service ID"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "hashKey",
          type: "text",
          label: {
            en: "Hash Key"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint"

          },
          access: {
            read: authenticated,

            create: authenticated,
            update: authenticated
          },
          required: true
        },
      ]
    },
    {
      name: "p24",
      label: {
        en: "Przelewy24 configuration"

      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "p24";
        },
        description: {

          en: "If you want to use test environment, you can also provide test keys here."
        }
      },
      fields: [
        {
          name: "posId",
          type: "text",
          label: {
            en: "POS ID (User ID)"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "crc",
          type: "text",
          label: {
            en: "CRC Key"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
        {
          name: "secretId",
          type: "text",
          label: {
            en: "Secret ID (Klucz do raportów)"

          },
          access: {
            read: authenticated,
            create: authenticated,

            update: authenticated
          },
          required: true
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint"

          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated
          },
          required: true
        },
      ]
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal]
  }
};
