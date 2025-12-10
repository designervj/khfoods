import { type Field } from "payload";

import { countryPickerField } from "./countryPickerField";
import { courierSettingsFields } from "./courierSettingsFields";
import { freeShippingField } from "./freeShippingField";
import { weightRangesField } from "./weightRangesField";

export const courierFields: Field[] = [
  {
    name: "enabled",
    type: "checkbox",
    label: {
      en: "Enable this courier"

    }
  },
  {
    name: "settings",
    label: {
      en: "Settings"

    },
    type: "group",

    fields: courierSettingsFields
  },
  {
    name: "deliveryZones",
    type: "array",
    label: {
      en: "Delivery zones"

    },
    labels: {
      plural: {
        en: "Delivery zones"

      },
      singular: {
        en: "Delivery zone"

      }
    },

    fields: [countryPickerField, freeShippingField, weightRangesField],
    admin: {
      components: {
        RowLabel: "@/components/(ecommerce)/RowLabels/DeliveryZonesRowLabel#DeliveryZonesRowLabel"
      }
    }
  },
  {
    name: "icon",
    type: "upload",
    label: {
      en: "Icon"

    },
    relationTo: "media",
    admin: {
      condition: (data) => Boolean(data.enabled)
    }
  },
];
