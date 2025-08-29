import { Config } from "payload";

export const seed: NonNullable<Config["onInit"]> = async (
  payload,
): Promise<void> => {
  const tenant1 = await payload.create({
    collection: "tenants",
    data: {
      name: "Phòng TM - HC",
      slug: "phong-tm-hc",
      domain: "tmhc.localhost",
      level: "department",
    },
  });

  const tenant2 = await payload.create({
    collection: "tenants",
    data: {
      name: "Phòng Đào tạo",
      slug: "phong-dao-tao",
      domain: "dt.localhost",
      level: "department",
    },
  });

  const tenant3 = await payload.create({
    collection: "tenants",
    data: {
      name: "Ban tài chính",
      slug: "ban-tai-chinh",
      domain: "bantc.localhost",
      level: "division",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "demo@payloadcms.com",
      password: "demo",
      roles: ["super-admin"],
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "tenant1@payloadcms.com",
      password: "demo",
      tenants: [
        {
          roles: ["tenant-admin"],
          tenant: tenant1.id,
        },
      ],
      username: "tenant1",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "tenant2@payloadcms.com",
      password: "demo",
      tenants: [
        {
          roles: ["tenant-admin"],
          tenant: tenant2.id,
        },
      ],
      username: "tenant2",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "tenant3@payloadcms.com",
      password: "demo",
      tenants: [
        {
          roles: ["tenant-admin"],
          tenant: tenant3.id,
        },
      ],
      username: "tenant3",
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "multi-admin@payloadcms.com",
      password: "demo",
      tenants: [
        {
          roles: ["tenant-admin"],
          tenant: tenant1.id,
        },
        {
          roles: ["tenant-admin"],
          tenant: tenant2.id,
        },
        {
          roles: ["tenant-admin"],
          tenant: tenant3.id,
        },
      ],
      username: "multi-admin",
    },
  });

  await payload.create({
    collection: "pages",
    data: {
      slug: "home",
      tenant: tenant1.id,
      title: "Page for Tenant 1",
    },
  });

  await payload.create({
    collection: "pages",
    data: {
      slug: "home",
      tenant: tenant2.id,
      title: "Page for Tenant 2",
    },
  });

  await payload.create({
    collection: "pages",
    data: {
      slug: "home",
      tenant: tenant3.id,
      title: "Page for Tenant 3",
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category A",
      name: "Type 1",
      tenants: [tenant1.id],
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category B",
      name: "Type 2",
      tenants: [tenant1.id],
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category C",
      name: "Type 3",
      tenants: [tenant2.id],
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category D",
      name: "Type 4",
      tenants: [tenant2.id],
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category E",
      name: "Type 5",
      tenants: [tenant3.id],
    },
  });

  await payload.create({
    collection: "categories",
    data :{
      title: "Category F",
      name: "Type 6",
      tenants: [tenant3.id],
    },
  });
  
};
