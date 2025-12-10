import { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";

export const Library: CollectionConfig = {
  slug: "presets",
  labels: {
    singular: { en: "Preset", zh: "预设" },
    plural: { en: "Presets", zh: "预设" }
  },
  admin: {
    useAsTitle: "name",
      group: {
        en: "Website Management",
        zh: "网站管理",
        hr: "Upravljanje web stranicom"
      }
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Layout", value: "layout" },
        { label: "Section", value: "section" },
        { label: "Module", value: "module" },
      ],
      admin: {
        width: "33%"
      }
    },
    {
      name: "value",
      type: "json",
      required: true,
      admin: {
        hidden:false
      }
    },
    // {
    //   name: "content",
    //   type: "blocks",
    //   blocks: layoutBlocks, // your existing blocks (Hero, Gallery, CTA, etc.)
    //   required: true,
    // },
  ]
};
