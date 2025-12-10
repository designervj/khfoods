import { type CollectionConfig } from "payload";

import { superAdminOnly, superAdminOnlyAdmin } from "@/access/roleBasedAccess";
import { getChartData } from "@/endpoints/adminDashboard/getChartData";
import { getOrderCount } from "@/endpoints/adminDashboard/getOrderCount";
import { getRevenue } from "@/endpoints/adminDashboard/getRevenue";
import { currencyField } from "@/fields/currencyField";
import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { courierSelectOptions } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";

import { generateID } from "./hooks/generateID";
import { restoreStocks } from "./hooks/restoreStocks";
import { sendStatusEmail } from "./hooks/sendStatusEmail";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    group: {
      en: "Orders",
      zh: "订单",
      hr: "Narudžbe"
    }
  },
  labels: {
    singular: {
      en: "Order",
      zh: "订单",
      hr: "Narudžba"
    },
    plural: {
      en: "Orders",
      zh: "订单",
      hr: "Narudžbe"
    }
  },
  access: {
    admin: superAdminOnlyAdmin,
    create: superAdminOnly,
    delete: superAdminOnly,
    read: superAdminOnly,
    update: superAdminOnly
  },
  hooks: {
    beforeValidate: [generateID]
  },
  endpoints: [
    {
      path: "/revenue",
      method: "post",
      handler: getRevenue
    },
    {
      path: "/count",
      method: "post",
      handler: getOrderCount
    },
    {
      path: "/chart",
      method: "get",
      handler: getChartData
    },
  ],
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        hidden: true
      },
      required: true,
      unique: true
    },
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "General"

          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "customer",
                  type: "relationship",
                  relationTo: "customers",
                  label: {
                    en: "Customer"

                  }
                },
                {
                  name: "date",
                  label: {
                    en: "Order Date"

                  },
                  type: "date",
                  admin: {
                    date: {
                      pickerAppearance: "dayAndTime"
                    },
                    readOnly: true
                  }
                },
              ]
            },
            {
              name: "extractedFromStock",
              type: "checkbox",
              admin: {
                hidden: true,
                readOnly: true
              }
            },
            {
              name: "products",
              type: "array",
              label: { en: "Products", zh: "产品" },
              admin: {
                components: {
                  RowLabel: "@/components/(ecommerce)/RowLabels/OrderProductsRowLabel#OrderProductsRowLabel"
                }
              },
              fields: [
                {
                  name: "product",
                  type: "relationship",
                  relationTo: "products"
                },
                {
                  name: "productName",
                  type: "text",
                  admin: {
                    hidden: true,
                    components: {
                      Field: "@/collections/(ecommerce)/Orders/components/ProductNameField#ProductNameField"
                    }
                  }
                },
                {
                  name: "isFromAPI",
                  type: "checkbox",
                  admin: { hidden: true },
                  required: true,
                  defaultValue: false
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "color",
                      type: "text",
                      admin: {
                        hidden: true
                      }
                    },
                    {
                      name: "size",
                      type: "text",
                      admin: {
                        hidden: true
                      }
                    },
                    {
                      name: "variantSlug",
                      type: "text",
                      label: {
                        en: "Variant Slug"

                      },
                      admin: {
                        components: {
                          Field: "@/collections/(ecommerce)/Orders/components/VariantSelect#VariantSelect"
                        },
                        width: "50%"
                      }
                    },
                    {
                      name: "quantity",
                      type: "number",
                      label: {
                        en: "Quantity"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "price",
                      type: "number",
                      label: {
                        en: "Price per unit"

                      },
                      admin: {
                        components: {
                          Field:
                            "@/collections/(ecommerce)/Orders/components/ProductUnitPriceField#ProductUnitPriceField"
                        },
                        width: "50%"
                      }
                    },
                    {
                      name: "autoprice",
                      type: "checkbox",
                      label: {
                        en: "Auto Price"

                      },
                      defaultValue: false,
                      admin: {
                        readOnly: true,
                        hidden: true
                      }
                    },
                    {
                      name: "priceTotal",
                      type: "number",
                      label: {
                        en: "Price Total"

                      },
                      admin: {
                        width: "50%",
                        components: {
                          Field:
                            "@/collections/(ecommerce)/Orders/components/ProductTotalPriceField#ProductTotalPriceField"
                        }
                      },
                      required: true
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          label: {
            en: "Invoice"

          },
          fields: [
            {
              name: "invoice",
              label: { en: "Invoice data", zh: "发票数据" },
              type: "group",
              fields: [
                {
                  name: "isCompany",
                  type: "checkbox",
                  label: {
                    en: "Company"

                  }
                },
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name"

                  }
                },
                {
                  name: "tin",
                  type: "text",
                  label: {
                    en: "TIN"

                  },
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData.isCompany)
                  }
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address"

                  }
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City"

                      },
                      admin: {
                        width: "50%"
                      }
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country"

                      },
                      options: [...countryList],
                      admin: {
                        width: "50%"
                      }
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region"

                      },
                      admin: {
                        width: "50%"
                      }
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: {
                        en: "Postal Code"

                      },
                      admin: {
                        width: "50%"
                      }
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          label: {
            en: "Shipping"

          },
          fields: [
            {
              name: "printLabel",
              label: { en: "Printing Labels", zh: "打印标签" },
              type: "group",
              fields: [
                {
                  name: "packageNumber",
                  type: "text",
                  admin: {
                    readOnly: true,
                    hidden: true
                  }
                },
                 {
                  name: "labelurl",
                  type: "text",
                  admin: {
                    readOnly: true,
                    hidden: true
                  }
                },
                {
                  name: "pickupShipmentMenu",
                  type: "ui",
                  admin: {
                    condition: (data) => Boolean(data.orderDetails?.shipping === "inpost-pickup"),
                    components: {
                      Field:
                        "@/collections/(ecommerce)/Orders/components/inpost-pickup/PickupShipmentMenu#PickupShipmentMenu"
                    }
                  }
                },
                {
                  name: "width",
                  type: "number",
                  admin: {
                    hidden: true
                  },
                  defaultValue: 0
                },
                {
                  name: "height",
                  type: "number",
                  admin: {
                    hidden: true
                  },
                  defaultValue: 0
                },
                {
                  name: "length",
                  type: "number",
                  admin: {
                    hidden: true
                  },
                  defaultValue: 0
                },
                {
                  name: "weight",
                  type: "number",
                  admin: {
                    hidden: true
                  },
                  defaultValue: 0
                },
                {
                  name: "dimension",
                  type: "text",
                  admin: {
                    hidden: true
                  },
                  defaultValue: "small"
                },
                {
                  name: "courierShipmentMenu",
                  type: "ui",
                  admin: {
                    condition: (data) => data.orderDetails.shipping !== "inpost-pickup",
                    components: {
                      Field:
                        "@/collections/(ecommerce)/Orders/components/couriers/CourierShipmentMenu#CourierShipmentMenu"
                    }
                  }
                },
              ]
            },
            {
              name: "shippingAddress",
              type: "group",
              label: {
                en: "Shipping Address"

              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name"

                  },

                  required: true
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address"

                  },

                  required: true
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "pickupPointID",
                      type: "text",
                      label: {
                        en: "Pickup point ID"

                      },
                      admin: {
                        width: "50%",

                        condition: (data) => data.orderDetails.shipping === "inpost-pickup"
                      }
                    },
                    {
                      name: "pickupPointAddress",
                      type: "text",
                      label: {
                        en: "Pickup point address"

                      },
                      admin: {
                        width: "50%",

                        condition: (data) => data.orderDetails.shipping === "inpost-pickup"
                      }
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country"

                      },
                      options: [...countryList],
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: {
                        en: "Postal Code"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "email",
                      type: "text",
                      label: {
                        en: "Email"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                    {
                      name: "phone",
                      type: "text",
                      label: {
                        en: "Phone number"

                      },
                      admin: {
                        width: "50%"
                      },
                      required: true
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    {
      name: "orderDetails",
      label: {
        en: "Order Details"

      },
      type: "group",
      admin: {
        position: "sidebar"
      },
      fields: [
        {
          name: "website",
          type: "relationship",
          relationTo: "websites"
        },
        {
          type: "row",
          fields: [
            {
              name: "total",
              type: "number",
              label: {
                en: "Total (without shipping)"

              },
              admin: {
                components: {
                  Field:
                    "@/collections/(ecommerce)/Orders/components/OrderTotalPriceField#OrderTotalPriceField"
                }
              },
              required: true
            },
            {
              name: "shippingCost",
              type: "number",
              label: {
                en: "Shipping Cost"

              },

              required: true
            },
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "totalWithShipping",
              type: "number",
              label: {
                en: "Total (with shipping)"

              },
              admin: {
                components: {
                  Field:
                    "@/collections/(ecommerce)/Orders/components/OrderTotalWithShippingField#OrderTotalWithShippingField"
                },
                width: "50%"
              },
              required: true
            },
            currencyField,
          ]
        },
        {
          name: "amountPaid",
          type: "number",
          defaultValue: 0,
          label: { en: "Amount Paid", zh: "已付金额" }
        },
        {
          name: "shipping",
          type: "select",
          label: {
            en: "Choosen Shipping Method"

          },
          options: courierSelectOptions
        },
        {
          name: "transactionID",
          type: "text",
          label: {
            en: "Transaction ID"

          },
          admin: {
            readOnly: true
          }
        },
        {
          name: "status",
          type: "select",
          label: {
            en: "Status"

          },
          hooks: {
            afterChange: [sendStatusEmail, restoreStocks]
          },
          options: [
            {
              label: {
                en: "Pending"

              },
              value: "pending"
            },
            {
              label: {
                en: "Paid"

              },
              value: "paid"
            },
            {
              label: {
                en: "Unpaid"

              },
              value: "unpaid"
            },
            {
              label: {
                en: "Processing"

              },
              value: "processing"
            },
            {
              label: {
                en: "Shipped"

              },
              value: "shipped"
            },
            {
              label: {
                en: "Completed"

              },
              value: "completed"
            },
            {
              label: {
                en: "Cancelled"

              },
              value: "cancelled"
            },
            {
              label: {
                en: "Returned"

              },
              value: "returned"
            },
          ],
          required: true,
          defaultValue: "pending"
        },
        {
          name: "shippingDate",
          label: {
            en: "Shipping Date"

          },
          type: "date"
        },
        {
          name: "trackingNumber",
          label: {
            en: "Tracking Number"

          },
          admin: {
            readOnly: true
          },
          type: "text"
        },
        {
          name: "orderNote",
          label: {
            en: "Order Note"

          },
          type: "textarea"
        },
      ]
    },
  ]
};
