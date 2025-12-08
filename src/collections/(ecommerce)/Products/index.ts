import { type CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { superAdminOnlyAdmin, superAdminOnly } from "@/access/roleBasedAccess";
// import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { currencyField } from "@/fields/currencyField";
import { defaultLexical } from "@/fields/defaultLexical";
import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: {
      en: "Product",
      pl: "Produkt",
      hr: "Proizvod", // Croatian
    },
    plural: {
      en: "Products list",
      pl: "Lista Produktów",
      hr: "Popis proizvoda", // Croatian
    },
  },
  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          path: `/product/${typeof data?.slug === "string" ? data.slug : ""}`,
          locale: req.locale,
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        path: `/product/${typeof data?.slug === "string" ? data.slug : ""}`,
        locale: req.locale,
      }),
    group: {
      en: "Products",
      pl: "Produkty",
      hr: "Proizvodi", // Croatian
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Product name",
        pl: "Nazwa proizvoda",
        hr: "Naziv proizvoda", // Croatian
      },
      type: "text",
      localized: true,
      required: true,
    },
    ...slugField(),
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Content",
            pl: "Zawartość",
          },
          fields: [
            {
              name: "description",
              label: {
                en: "Product description",
                pl: "Opis proizvoda",
                hr: "Opis proizvoda", // Croatian
              },
              localized: true,
              type: "richText",
              editor: defaultLexical,
            },
            {
              name: "images",
              label: {
                en: "Product images",
                pl: "Zdjęcia proizvoda",
                hr: "Slike proizvoda", // Croatian
              },
              type: "upload",
              relationTo: "media",
              hasMany: true,
              maxRows: 10,
              minRows: 1,
              required: true,
              admin: {
                description: {
                  en: "If you have variants, first image will be variant image.",
                  pl: "Jeśli masz warianty, pierwsze zdjęcie będzie zdjęciem wariantu.",
                  hr: "Ako imate varijante, prva slika će biti slika varijante.", // Croatian
                },
              },
            },
            {
              name: "details",
              type: "array",
              label: {
                en: "Details",
                pl: "Szczegóły",
                hr: "Detalji", // Croatian
              },
              labels: {
                singular: {
                  en: "Detail",
                  pl: "Szczegół",
                  hr: "Detalj", // Croatian
                },
                plural: {
                  en: "Details",
                  pl: "Szczegóły",
                  hr: "Detalji", // Croatian
                },
              },
              admin: {
                components: {
                  RowLabel: "@/collections/(ecommerce)/Products/components/RowLabels/DetailLabel#DetailLabel",
                },
              },
              fields: [
                {
                  name: "title",
                  label: {
                    en: "Title",
                    pl: "Tytuł",
                    hr: "Naslov", // Croatian
                  },
                  localized: true,
                  type: "text",
                  required: true,
                },
                {
                  name: "content",
                  label: {
                    en: "Content",
                    pl: "Zawartość",
                    hr: "Sadržaj", // Croatian
                  },
                  localized: true,
                  required: true,
                  type: "richText",
                  editor: defaultLexical,
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Variants options",
            pl: "Opcje wariantów",
            hr: "Opcije varijanti", // Croatian
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "enableVariants",
                  label: {
                    en: "Enable variants",
                    pl: "Włącz warianty",
                    hr: "Omogući varijante", // Croatian
                  },
                  type: "checkbox",
                  admin: {
                    width: "fit-content",
                  },
                },
                {
                  name: "enableVariantPrices",
                  label: {
                    en: "Variants have different prices",
                    pl: "Warianty mają różne ceny",
                    hr: "Varijante imaju različite cijene", // Croatian
                  },

                  type: "checkbox",
                  admin: {
                    description: {
                      en: "If false, price is in Product Details",
                      pl: "Jeśli fałsz, cena jest w Szczegółach produktu",
                      hr: "Ako je netočno, cijena je u detaljima proizvoda.", // Croatian
                    },
                    width: "fit-content",
                    style: {
                      marginLeft: "2rem",
                    },
                  },
                },
                {
                  name: "enableVariantWeights",
                  label: {
                    en: "Variants have different weights",
                    pl: "Warianty mają różne wagi",
                    hr: "Varijante imaju različite težine", // Croatian
                  },

                  type: "checkbox",
                  admin: {
                    description: {
                      en: "If false, weight is in Product Details",
                      pl: "Jeśli fałsz, waga jest w Szczegółach produktu",
                      hr: "Ako je netočno, težina je u detaljima proizvoda.", // Croatian
                    },
                    width: "fit-content",
                    style: {
                      marginLeft: "2rem",
                    },
                  },
                },
              ],
            },
            {
              type: "radio",
              name: "variantsType",
              label: {
                en: "Variants type",
                pl: "Rodzaj wariantów",
              },
              admin: {
                condition: (data) => Boolean(data.enableVariants),
              },
              defaultValue: "sizes",
              options: [
                {
                  value: "sizes",
                  label: {
                    en: "Only sizes",
                    pl: "Tylko rozmiary",
                  },
                },
                {
                  value: "colors",
                  label: {
                    en: "Only colors",
                    pl: "Tylko kolory",
                  },
                },
                {
                  value: "colorsAndSizes",
                  label: {
                    en: "Colors and sizes",
                    pl: "Kolory i rozmiary",
                  },
                },
              ],
            },
            {
              name: "colors",
              labels: {
                singular: {
                  en: "Color",
                  pl: "Kolor",
                },
                plural: {
                  en: "Colors",
                  pl: "Kolory",
                },
              },
              type: "array",
              admin: {
                components: {
                  RowLabel: "@/collections/(ecommerce)/Products/components/RowLabels/OptionLabel#OptionLabel",
                },
                condition: (_, siblingData) =>
                  Boolean(siblingData.enableVariants && siblingData.variantsType !== "sizes"),
                initCollapsed: true,
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      label: {
                        en: "Color name",
                        pl: "Nazwa koloru",
                      },
                      type: "text",
                      localized: true,
                      required: true,
                    },
                    {
                      name: "slug",
                      type: "text",
                      required: true,
                      label: {
                        en: "Color slug",
                        pl: "Slug koloru",
                      },
                    },
                  ],
                },
                {
                  name: "colorValue",
                  label: {
                    en: "Color",
                    pl: "Kolor",
                  },
                  type: "text",
                  admin: {
                    components: {
                      Field: "@/components/AdminColorPicker#AdminColorPicker",
                    },
                  },
                },
              ],
              label: {
                en: "Color options",
                pl: "Opcje kolorów",
              },
              minRows: 1,
            },
            {
              name: "sizes",
              labels: {
                singular: {
                  en: "Size",
                  pl: "Rozmiar",
                },
                plural: {
                  en: "Sizes",
                  pl: "Rozmiary",
                },
              },
              type: "array",
              admin: {
                components: {
                  RowLabel: "@/collections/(ecommerce)/Products/components/RowLabels/OptionLabel#OptionLabel",
                },
                condition: (_, siblingData) =>
                  Boolean(siblingData.enableVariants && siblingData.variantsType !== "colors"),
                initCollapsed: true,
              },
              fields: [
                {
                  name: "label",
                  label: {
                    en: "Size label",
                    pl: "Etykieta rozmiaru",
                  },
                  type: "text",
                  localized: true,
                  required: true,
                },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  label: {
                    en: "Size slug",
                    pl: "Slug rozmiaru",
                  },
                },
              ],
              label: {
                en: "Size options",
                pl: "Opcje rozmiarów",
              },
              minRows: 1,
            },
            {
              name: "variants",
              type: "array",
              admin: {
                components: {
                  RowLabel:
                    "@/collections/(ecommerce)/Products/components/RowLabels/VariantLabel#VariantLabel",
                },
                condition: (_, siblingData) => {
                  return Boolean(siblingData.enableVariants);
                },
              },
              validate: (value) => {
                if (!value) return true;

                const groupedByVariantSlug = value.reduce((acc: Record<string, any[]>, item: any) => {
                  if (!acc[item.variantSlug]) {
                    acc[item.variantSlug] = [];
                  }

                  acc[item.variantSlug].push(item);
                  return acc;
                }, {}) as any[];

                const duplicateSlugs = Object.keys(groupedByVariantSlug).filter(
                  (slug) => groupedByVariantSlug[slug].length > 1,
                );
                if (duplicateSlugs.length > 0) {
                  return `Duplicated variant slugs: ${duplicateSlugs.join(", ")}`;
                }
                return true;
              },
              fields: [
                {
                  type: "row",
                  admin: {
                    className: "variant-gap-row",
                  },
                  fields: [
                    {
                      name: "size",
                      type: "text",
                      index: true,
                      label: {
                        en: "Size",
                        pl: "Rozmiar",
                      },
                      admin: {
                        components: {
                          Field: "@/collections/(ecommerce)/Products/components/SizeSelect#SizeSelect",
                        },
                        condition: (_, siblingData) => siblingData.variantsType !== "colors",
                      },
                    },
                    {
                      name: "color",
                      index: true,
                      type: "text",
                      label: {
                        en: "Color",
                        pl: "Kolor",
                      },
                      admin: {
                        components: {
                          Field: "@/collections/(ecommerce)/Products/components/ColorSelect#ColorSelect",
                        },
                        condition: (_, siblingData) => siblingData.variantsType !== "sizes",
                      },
                    },
                  ],
                },
                {
                  name: "variantSlug",
                  type: "text",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "stock",
                  type: "number",
                  admin: {
                    description: {
                      en: "Define stock for this variant. A stock of 0 disables checkout for this variant.",
                      pl: "Zdefiniuj stan magazynowy dla tego wariantu. Stan magazynowy 0 wyłącza możliwość zakupu tego wariantu.",
                    },
                  },
                  defaultValue: 0,
                  required: true,
                },
                {
                  name: "weight",
                  label: {
                    en: "Weight (g)",
                    pl: "Waga (g)",
                  },
                  type: "number",
                  admin: {
                    condition: (data) => Boolean(data.enableVariantWeights),
                    description: {
                      en: "Define weight for this variant.",
                      pl: "Zdefiniuj wagę dla tego wariantu.",
                    },
                  },
                  defaultValue: 0,
                  required: true,
                },
                {
                  name: "pricing",
                  type: "array",
                  label: {
                    en: "Pricing",
                    pl: "Cennik",
                  },
                  minRows: 1,
                  required: true,
                  labels: {
                    singular: {
                      en: "Price",
                      pl: "Cena",
                    },
                    plural: {
                      en: "Prices",
                      pl: "Ceny",
                    },
                  },
                  admin: {
                    condition: (data) => Boolean(data.enableVariantPrices),
                    components: {
                      RowLabel: "@/components/(ecommerce)/RowLabels/PriceRowLabel#PriceRowLabel",
                    },
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "value",
                          index: true,
                          type: "number",
                          label: {
                            en: "Price",
                            pl: "Cena",
                          },
                          required: true,
                        },
                        currencyField,
                      ],
                    },
                  ],
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: {
            en: "Product details",
            pl: "Szczegóły produktu",
          },
          admin: {
            // todo: not working condition, waiting for payload team to fix conditional tabs.
            // condition: (data) => {
            //   return !data.enableVariants && !data.enableVariantPrices;
            // },
          },
          fields: [
            {
              name: "categoriesArr",
              label: {
                en: "Product categories",
                pl: "Kategorie produktu",
              },
              labels: {
                singular: {
                  en: "Category",
                  pl: "Kategoria",
                },
                plural: {
                  en: "Categories",
                  pl: "Kategorie",
                },
              },
              type: "array",
              fields: [
                {
                  name: "category",
                  label: {
                    en: "Category",
                    pl: "Kategoria",
                  },
                  type: "relationship",
                  index: true,
                  relationTo: "productCategories",
                  required: true,
                },
                {
                  name: "subcategories",
                  index: true,
                  type: "relationship",
                  label: {
                    en: "Subcategories",
                    pl: "Podkategorie",
                  },
                  relationTo: "productSubCategories",
                  filterOptions: ({ siblingData }) => {
                    const siblingDataTyped: {
                      category: string;
                    } = siblingData as any;
                    return {
                      category: {
                        equals: siblingDataTyped.category,
                      },
                    };
                  },
                  hasMany: true,
                },
              ],
            },
            {
              name: "stock",
              label: {
                en: "Stock",
                pl: "Stan magazynowy",
              },
              type: "number",
              admin: {
                condition: (data) => !data.enableVariants,
                description: {
                  en: "Define stock for whole product. A stock of 0 disables checkout for this product.",
                  pl: "Zdefiniuj stan magazynowy dla całego produktu. Stan magazynowy 0 wyłącza możliwość zakupu tego produktu.",
                },
              },
              defaultValue: 0,
              required: true,
            },
            {
              name: "weight",
              label: {
                en: "Weight (g)",
                pl: "Waga (g)",
              },
              type: "number",
              admin: {
                condition: (data) => !data.enableVariantWeights,
                description: {
                  en: "Define weight for whole product.",
                  pl: "Zdefiniuj wagę dla całego produktu.",
                },
              },
              defaultValue: 0,
              required: true,
            },
            {
              name: "pricing",
              type: "array",
              label: {
                en: "Pricing",
                pl: "Cennik",
              },
              minRows: 1,
              required: true,
              labels: {
                singular: {
                  en: "Price",
                  pl: "Cena",
                },
                plural: {
                  en: "Prices",
                  pl: "Ceny",
                },
              },
              admin: {
                condition: (data) => !data.enableVariantPrices,
                components: {
                  RowLabel: "@/components/(ecommerce)/RowLabels/PriceRowLabel#PriceRowLabel",
                },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "number",
                      index: true,
                      label: {
                        en: "Price",
                        pl: "Cena",
                      },
                      required: true,
                    },
                    currencyField,
                  ],
                },
              ],
            },
            {
              name: "bought",
              index: true,
              label: {
                en: "Bought",
                pl: "Kupiono",
              },
              type: "number",
              defaultValue: 0,
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
