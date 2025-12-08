// Utility: Map permission arrays to checkbox fields
export function mapPermissionArraysToCheckboxes(doc: any) {
  const actions = ['create', 'read', 'update', 'delete'];
  const groups = ['admin', 'pages', 'products', 'media', 'post', 'website', 'order', 'shop', 'courier'];
  for (const group of groups) {
    const arrayField = `${group}Permission`;
    for (const action of actions) {
      const checkboxField = `${group}_${action}`;
      doc[checkboxField] = Array.isArray(doc[arrayField]) && doc[arrayField].includes(action);
    }
  }
  return doc;
}
import { CollectionConfig } from "payload";
import type { AccessArgs } from "payload";
import type { Administrator } from "@/payload-types";
import {authenticated} from "@/access/authenticated";
import { checkUserPermission } from "@/access/roleBasedAccess";


const isReadAccess = async(args: AccessArgs<Administrator>) => {
  const base = await checkUserPermission(args, "read", "adminPermission");
  if (base === true &&args.req?.user?.id) {
    return {
      and: [
        base,
        { administrators: { equals: args.req.user.id } }
      ]
    };
  }
  return base;
}

const isCreateAccess = (args: AccessArgs<Administrator>) => 
  checkUserPermission(args, 'create',"adminPermission");

const isUpdateAccess = (args: AccessArgs<Administrator>) => 
  checkUserPermission(args, 'update',"adminPermission");

const isDeleteAccess = (args: AccessArgs<Administrator>) => 
  checkUserPermission(args, 'delete',"adminPermission");
export const Permission: CollectionConfig = {
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc) {
          mapPermissionArraysToCheckboxes(doc);
        }
        return doc;
      },
    ],
    beforeChange: [
      async ({ data }) => {
        // Map checkbox fields back to permission arrays before saving
        const actions = ['create', 'read', 'update', 'delete'];
        const groups = ['admin', 'pages', 'products', 'media', 'post', 'website', 'order', 'shop', 'courier'];
        for (const group of groups) {
          const arrayField = `${group}Permission`;
          data[arrayField] = [];
          for (const action of actions) {
            const checkboxField = `${group}_${action}`;
            if (data[checkboxField]) {
              data[arrayField].push(action);
            }
          }
        }
        return data;
      },
    ],
  },
  slug: "permission",
  labels: {
    singular: {
      en: "Permission",
      pl: "Zestaw Uprawnień",
      hr: "Dozvola",
    },
    plural: {
      en: "Permissions",
      pl: "Zestawy Uprawnień",
      hr: "Dozvole",
    },
  },
  access: {
    read: isReadAccess,
    create: isCreateAccess,
    update: isUpdateAccess,
    delete: isDeleteAccess,
    admin:isReadAccess
  },
  admin: {
   defaultColumns:["roleTitle","administrators"],
    group: {
      en: "Administration",
      pl: "Administracja",
      hr: "Administracija",
    },
  },
  fields: [
    {
      name: "roleTitle",
      label: {
        en: "Role Title",
        hr: "Naziv uloge",
        pl: "Nazwa roli",
      },
      type: "text",
      required: true,
    },
    {
      name: "administrators",
      label: {
        en: "Administrators",
        hr: "Administratori",
        pl: "Administratorzy",
      },
      type: "relationship",
      relationTo: "administrators",
      hasMany: true,
      required: true,
      admin: {
        description: "All administrators with this role",
      },
    },
   
     /// administration collection
    {
      type: "collapsible",
      label: "Administration Collection",
      fields: [
        {
          type: "row",

          fields: [
            {
              name: "admin_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "admin_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "admin_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "admin_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },
    // Pages Collection Permissions
    {
      type: "collapsible",
      label: "Pages Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "pages_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "pages_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "pages_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "pages_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // Products Collection Permissions
    {
      type: "collapsible",
      label: "Products Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "products_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "products_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "products_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "products_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // Media Collection Permissions
    {
      type: "collapsible",
      label: "Media Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "media_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "media_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "media_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "media_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // PostCollection Permissions
    {
      type: "collapsible",
      label: "Post Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "post_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "post_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "post_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "post_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // website Collection Permissions
    {
      type: "collapsible",
      label: "Website Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "website_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "website_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "website_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "website_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // order Collection Permissions
    {
      type: "collapsible",
      label: "Order Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "order_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "order_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "order_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "order_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // Shop Collection Permissions
    {
      type: "collapsible",
      label: "Shop Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "shop_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "shop_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "shop_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "shop_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },

    // Courier Collection Permissions
    {
      type: "collapsible",
      label: "Courier Collection",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "courier_create",
              type: "checkbox",
              label: {
                en: "Create",
                hr: "Kreiraj",
                pl: "Utwórz",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "courier_read",
              type: "checkbox",
              label: {
                en: "Read",
                hr: "Čitaj",
                pl: "Czytaj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "courier_update",
              type: "checkbox",
              label: {
                en: "Update",
                hr: "Ažuriraj",
                pl: "Aktualizuj",
              },
              defaultValue: false,
              virtual: true,
            },
            {
              name: "courier_delete",
              type: "checkbox",
              label: {
                en: "Delete",
                hr: "Obriši",
                pl: "Usuń",
              },
              defaultValue: false,
              virtual: true,
            },
          ],
        },
      ],
    },


    // Metadata fields
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "administrators",
      label: "Created By",
  defaultValue: (req) => req.user ? req.user.id : null,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
   // Hidden permission array fields for database storage
    // These fields store the transformed checkbox data as arrays
    {
      name: "adminPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "pagesPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "productsPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "mediaPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "postPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "websitePermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "orderPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "shopPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "courierPermission",
      type: "text",
      hasMany: true,
      admin: {
        hidden: true,
      },
    },
  ],
  timestamps: true,
};
