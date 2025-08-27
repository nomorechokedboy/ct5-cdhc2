import type { CollectionConfig } from "payload";
import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { updateAndDeleteAccess } from "./access/updateAndDelete";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => true,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "domain",
      type: "text",
      admin: {
        description: "Used for domain-based tenant handling",
      },
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Used for url paths, example: /tenant-slug/page-slug",
      },
      index: true,
      required: true,
    },
    {
      name: "allowPublicRead",
      type: "checkbox",
      admin: {
        description:
          "If checked, logging in is not required to read. Useful for building public pages.",
        position: "sidebar",
      },
      defaultValue: false,
      index: true,
    },
    {
      name: "level",
      type: "select",
      options: [
        {
          label: "Phòng",
          value: "department",
        },
        {
          label: "Ban",
          value: "division",
        },
      ],
      admin: {
        description: "",
        position: "sidebar",
      },
      defaultValue: "department",
      index: true,
    },
    {
      name: 'relatedTenant',
      type : 'join',
      collection: 'categories',
      on: 'tenants'
    },
    
  ],
};
