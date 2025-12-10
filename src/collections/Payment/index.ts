import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { CollectionConfig } from "payload";

export const Payment: CollectionConfig = {
  slug: "payment",
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Payments settings",
      zh: "支付设置"
    },
    useAsTitle: "website"
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
         
          required: true
        },
        {
          name: "webhookSecret",
          type: "text",
          label: {
            en: "Webhook Secret API Key"

          },
          
          required: true
        },
        {
          name: "public",
          type: "text",
          label: {
            en: "Public API Key"

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
          
          required: true
        },
        {
          name: "hashKey",
          type: "text",
          label: {
            en: "Hash Key"

          },
         
          required: true
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint"

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
       
          required: true
        },
        {
          name: "crc",
          type: "text",
          label: {
            en: "CRC Key"

          },
          required: true
        },
        {
          name: "secretId",
          type: "text",
          label: {
            en: "Secret ID (Klucz do raportów)"

          },
       
          required: true
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint"

          },
          required: true
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
