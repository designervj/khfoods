import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { CollectionConfig } from "payload";

export const Payment: CollectionConfig = {
  slug: "payment",
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Payments settings",
      pl: "Ustawienia płatności",
    },
    useAsTitle: "website"
  },
  fields: [
    {
      name: "paywall",
      label: {
        en: "Paywall",
        pl: "Bramka płatności",
      },
      type: "select",
      options: [
        {
          label: {
            en: "Stripe",
            pl: "Stripe",
          },
          value: "stripe",
        },
        {
          label: {
            en: "Autopay",
            pl: "Autopay",
          },
          value: "autopay",
        },
        {
          label: {
            en: "Przelewy24",
            pl: "Przelewy24",
          },
          value: "p24",
        },
      ],
      defaultValue: "stripe",
      required: true,
    },
    {
      name: "stripe",
      label: {
        en: "Stripe configuration",
        pl: "Konfiguracja Stripe",
      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "stripe";
        },
        description: {
          pl: "Jeśli chcesz korzystać ze środowiska testowego, podaj tu odpowiadające klucze.",
          en: "If you want to use test environment, you can also provide test keys here.",
        },
      },
      fields: [
        {
          name: "secret",
          type: "text",
          label: {
            en: "Secret API Key",
            pl: "Prywatny klucz API",
          },
         
          required: true,
        },
        {
          name: "webhookSecret",
          type: "text",
          label: {
            en: "Webhook Secret API Key",
            pl: "Prywatny klucz API Webhook",
          },
          
          required: true,
        },
        {
          name: "public",
          type: "text",
          label: {
            en: "Public API Key",
            pl: "Publiczny klucz API",
          },
          
        },
      ],
    },
    {
      name: "autopay",
      label: {
        en: "Autopay configuration",
        pl: "Konfiguracja Autopay",
      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "autopay";
        },
        description: {
          pl: "Jeśli chcesz korzystać ze środowiska testowego, podaj tu odpowiadające klucze.",
          en: "If you want to use test environment, you can also provide test keys here.",
        },
      },
      fields: [
        {
          name: "serviceID",
          type: "text",
          label: {
            en: "Service ID",
            pl: "ServiceID (Identyfikator Serwisu Partnera)",
          },
          
          required: true,
        },
        {
          name: "hashKey",
          type: "text",
          label: {
            en: "Hash Key",
            pl: "HashKey (Klucz do generowania hasha)",
          },
         
          required: true,
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint",
            pl: "Endpoint",
          },
          required: true,
        },
      ],
    },
    {
      name: "p24",
      label: {
        en: "Przelewy24 configuration",
        pl: "Konfiguracja Przelewy24",
      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "p24";
        },
        description: {
          pl: "Jeśli chcesz korzystać ze środowiska testowego, podaj tu odpowiadające klucze.",
          en: "If you want to use test environment, you can also provide test keys here.",
        },
      },
      fields: [
        {
          name: "posId",
          type: "text",
          label: {
            en: "POS ID (User ID)",
            pl: "POS ID (ID użytkownika)",
          },
       
          required: true,
        },
        {
          name: "crc",
          type: "text",
          label: {
            en: "CRC Key",
            pl: "CRC (Klucz do CRC)",
          },
          required: true,
        },
        {
          name: "secretId",
          type: "text",
          label: {
            en: "Secret ID (Klucz do raportów)",
            pl: "Secret ID (Klucz do raportów)",
          },
       
          required: true,
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint",
            pl: "Endpoint",
          },
          required: true,
        },
      ],
    },
      {
      name: "website",
      type: "relationship",
      relationTo: "websites",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
