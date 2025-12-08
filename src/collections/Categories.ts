import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";

import type { AccessArgs } from "payload";
import type { Administrator } from "@/payload-types";
import type { CollectionConfig } from "payload";
import { checkUserPermission } from "@/access/roleBasedAccess";

// const isReadAccess = (args: AccessArgs<Administrator>) =>
//   checkUserPermission(args, "read", "productcatPermission");

// const isCreateAccess = (args: AccessArgs<Administrator>) =>
//   checkUserPermission(args, "write", "productcatPermission");

// const isUpdateAccess = (args: AccessArgs<Administrator>) =>
//   checkUserPermission(args, "update", "productcatPermission");

// const isDeleteAccess = (args: AccessArgs<Administrator>) =>
//   checkUserPermission(args, "delete", "productcatPermission");
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    plural: {
      en: "Posts Categories",
      pl: "Kategorie postów",
      hr: "Kategorije objava", // Croatian
    },
    singular: {
      en: "Post Category",
      pl: "Kategoria postów",
      hr: "Kategorija objave", // Croatian
    },
  },
  admin: {
    useAsTitle: "title",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
      hr: "Postavke stranice", // Croatian
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
