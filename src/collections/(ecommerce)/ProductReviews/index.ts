import { type CollectionConfig } from "payload";

export const ProductReviews: CollectionConfig = {
  slug: "productReviews",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true
  },
  admin: {
    group: {
      en: "Products",
      zh: "产品",
      hr: "Proizvodi"
    }
  },
  labels: {
    singular: {
      en: "Product Review",
      zh: "产品评论",
      hr: "Recenzija proizvoda"
    },
    plural: {
      en: "Product Reviews",
      zh: "产品评论",
      hr: "Recenzije proizvoda"
    }
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true
    },
    {
      name: "author",
      label: {

        en: "Review author"
      },
      type: "relationship",
      relationTo: "customers",
      required: true
    },
    {
      name: "rating",
      label: {

        en: "Rating"
      },
      type: "number",
      required: true,
      max: 5,
      min: 1
    },
    {
      name: "review",
      label: {

        en: "Review content"
      },
      type: "richText"
    },
  ]
};
