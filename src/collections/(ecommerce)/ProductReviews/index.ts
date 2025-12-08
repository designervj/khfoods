import { type CollectionConfig } from "payload";

export const ProductReviews: CollectionConfig = {
  slug: "productReviews",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    group: {
      en: "Products",
      pl: "Produkty",
      hr: "Proizvodi",
    },
  },
  labels: {
    singular: {
      en: "Product Review",
      pl: "Opinia o produkcie",
      hr: "Recenzija proizvoda",
    },
    plural: {
      en: "Product Reviews",
      pl: "Opinie o produktach",
      hr: "Recenzije proizvoda",
    },
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "author",
      label: {
        pl: "Autor opinii",
        en: "Review author",
      },
      type: "relationship",
      relationTo: "customers",
      required: true,
    },
    {
      name: "rating",
      label: {
        pl: "Ocena",
        en: "Rating",
      },
      type: "number",
      required: true,
      max: 5,
      min: 1,
    },
    {
      name: "review",
      label: {
        pl: "Treść opinii",
        en: "Review content",
      },
      type: "richText",
    },
  ],
};
