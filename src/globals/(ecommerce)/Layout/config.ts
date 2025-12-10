import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from "@payloadcms/richtext-lexical";

import { Accordion } from "@/blocks/Accordion/config";
import { Banner } from "@/blocks/Banner/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Code } from "@/blocks/Code/config";
import { FormBlock } from "@/blocks/Form/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const ShopLayout: GlobalConfig = {
  slug: "shopLayout",
  label: {
    en: "Shop Layout",

    zh: "商店布局"
  },
  access: {
    read: () => true
  },
  admin: {
    group: {
      en: "Shop settings",

      zh: "商店设置"
    }
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Product Details",

            zh: "产品详情"
          },
          name: "productDetails",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With image gallery and expandable details",

                    zh: "带图库和可展开详情"
                  },
                  value: "WithImageGalleryExpandableDetails"
                },
              ],
              label: {
                en: "Type of product card",

                zh: "产品卡类型"
              },
              required: true,
              defaultValue: "WithImageGalleryExpandableDetails"
            },
            {
              name: "reviewsEnabled",
              type: "checkbox",
              label: {
                en: "Enable product reviews",

                zh: "启用产品评论"
              },
              defaultValue: true,
              required: true
            },
          ]
        },
        {
          label: {
            en: "Product List",

            zh: "产品列表"
          },
          name: "productList",
          fields: [
            {
              name: "filters",
              type: "select",
              label: {
                en: "Filters",

                zh: "过滤器"
              },
              required: true,
              options: [
                {
                  label: {
                    en: "None",

                    zh: "无"
                  },
                  value: "none"
                },
                {
                  label: {
                    en: "With sidebar",

                    zh: "带侧边栏"
                  },
                  value: "withSidebar"
                },
                {
                  label: {
                    en: "Sort only",

                    zh: "仅排序"
                  },
                  value: "sortOnly"
                },
              ]
            },
          ]
        },
        {
          label: {
            en: "Cart and Wishlist",

            zh: "购物车和心愿单"
          },
          name: "cartAndWishlist",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "Slide-over",

                    zh: "滑出式"
                  },
                  value: "slideOver"
                },
              ],
              label: {
                en: "Type of cart and wishlist",

                zh: "购物车和心愿单类型"
              },
              defaultValue: "slideOver",
              required: true
            },
          ]
        },
        {
          label: {
            en: "Checkout page",

            zh: "结账页面"
          },
          name: "checkout",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "One Step With Summary",

                    zh: "一步式结账含摘要"
                  },
                  value: "OneStepWithSummary"
                },
              ],
              label: {
                en: "Type of checkout page",

                zh: "结账页面类型"
              },
              required: true,
              defaultValue: "OneStepWithSummary"
            },
          ]
        },
        {
          label: {
            en: "Client panel",

            zh: "客户面板"
          },
          name: "clientPanel",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With sidebar",

                    zh: "带侧边栏"
                  },
                  value: "withSidebar"
                },
              ],
              label: {
                en: "Type of client panel",

                zh: "客户面板类型"
              },
              required: true,
              defaultValue: "withSidebar"
            },
            {
              name: "help",
              type: "group",
              label: {
                en: "Help page",

                zh: "帮助页面"
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: {
                    en: "Title",

                    zh: "标题"
                  },
                  localized: true,
                  required: true
                },
                {
                  name: "content",
                  type: "richText",
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                        BlocksFeature({ blocks: [Banner, Code, MediaBlock, Accordion, Carousel, FormBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                      ];
                    }
                  }),
                  label: {
                    en: "Content",

                    zh: "内容"
                  },
                  localized: true,
                  required: true
                },
              ]
            },
          ]
        },
      ]
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal]
  }
};
