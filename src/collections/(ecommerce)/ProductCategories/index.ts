import { type CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { slugField } from "@/fields/slug";

export const ProductCategories: CollectionConfig = {
  slug: "productCategories",
  admin: {
    useAsTitle: "title",
    group: {
      en: "Products",
      zh: "产品"
    }
  },
  labels: {
    singular: {
      en: "Product Category",
      zh: "产品分类"
    },
    plural: {
      en: "Product Categories",
      zh: "产品分类"
    }
  },
  access: {
    read: anyone
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Category name"

      },
      type: "text",
      required: true,
      localized: true
    },
    ...slugField(),
    {
      name: "subcategories",
      label: {
        en: "Related subcategories"

      },
      type: "join",
      collection: "productSubCategories",
      on: "category"
    },
    {
      name: "products",
      label: {
        en: "Products in this category"

      },
      type: "join",
      collection: "products",
      on: "categoriesArr.category"
    },
  ]
};
