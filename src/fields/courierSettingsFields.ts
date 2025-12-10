import { type Field } from "payload";

export const courierSettingsFields: Field[] = [
  { name: "label", type: "text", label: { en: "Label", zh: "标签" }, localized: true, required: true },
  {
    name: "description",
    type: "text",
    label: { en: "Short description", zh: "简短描述" },
    localized: true,
    admin: {
      description: {
        en: "You can provide typical delivery time or any other information"

      }
    }
  },
];
