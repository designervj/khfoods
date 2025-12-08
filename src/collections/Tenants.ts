import { slugField } from "@/fields/slug";
import { toast } from "@payloadcms/ui";
import { Sidebar } from "lucide-react";
import { Access, CollectionConfig } from "payload";

export const Websites: CollectionConfig = {
  slug: "websites",
  labels: {
    singular: "Website",
    plural: "Websites",
  },
  defaultPopulate: {
    name: true,
    slug: true,
  },
  admin: {
    useAsTitle: "name",
    group: "Website Management",
    meta: {
      other: {
        order: 0,
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "domains",
      type: "array",

      fields: [
        {
          name: "admintype",
          label: "Select Domain Type",
          type: "radio",
          options: ["Own Domain", "Sub Domain"],
          admin: {
            description: `
Sub Domain Guidelines:
• Enter only the plain name (no domain extensions)
• Do NOT include: http://, https://, www, .com, .in, etc.
• System will automatically convert: name → name.mandalalabs.xyz
Example: Enter "mydomain" → Saved as "mydomain.mandalalabs.xyz"
`,
          },
        },
        {
          name: "domain",
          type: "text",
          required: true,
          hooks: {
            beforeValidate: [
              async ({ siblingData, value, originalDoc }) => {

                if (siblingData.admintype === "Own Domain") {
                  return value;
                }

                if (!value) return value;

                let v = value.toLowerCase().trim();

                let findvalue = originalDoc.domains.find((d)=>{
                  return d.domain.includes(originalDoc.slug)
                })

                if (findvalue) {
                  v = v.replace(/^https?:\/\//, "");
                  v = v.split("/")[0];
                  v = v.split(".")[0];
                } else {
                  v = originalDoc.slug;
                }
                const finalDomain = `${v}.mandalalabs.xyz`;
                siblingData.domain = finalDomain;
                return finalDomain;
              },
            ],
           
          },
        },
      ],
    },

    {
      name: "createdBy",
      type: "relationship",
      relationTo: "administrators",
      defaultValue: ({ req: { user } }) => user?.id ?? null,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },

    {
      name: "tenantID",
      type: "relationship",
      relationTo: "administrators",
      admin: {
        position: "sidebar",
      },
    },

    ...slugField("name"),
  ],
};
