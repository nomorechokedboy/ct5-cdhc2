import { Config } from "payload";

export const seed: NonNullable<Config["onInit"]> = async (
  payload,
): Promise<void> => {

  //Seed tenants
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


  //Seed users
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

  //Seed pages
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


  // Seed categories
  const category1 = await payload.create({
    collection: "categories",
    data :{
      title: "Thể loại A",
      name: "Type 1",
      tenants: [tenant1.id],
    },
  });

  const category2 = await payload.create({
    collection: "categories",
    data :{
      title: "Thể loại B",
      name: "Type 2",
      tenants: [tenant1.id],
    },
  });

  const category3 = await payload.create({
    collection: "categories",
    data :{
      title: "Thể loại C",
      name: "Type 3",
      tenants: [tenant2.id],
    },
  });

  const category4 = await payload.create({
    collection: "categories",
    data :{
      title: "Bình Rèn",
      name: "Type 4",
      tenants: [tenant2.id],
    },
  });

  const category5 = await payload.create({
    collection: "categories",
    data :{
      title: "Thể loại E",
      name: "Type 5",
      tenants: [tenant3.id],
    },
  });

  const category6 = await payload.create({
    collection: "categories",
    data :{
      title: "Bình rèn",
      name: "Type 6",
      tenants: [tenant3.id],
    },
  });

  //Seed posts

    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 1",
      excerpt:"ĐNhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category1], 
      publishedAt: new Date().toISOString(),
    },
  });
  
    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 2",
      excerpt:"Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category2], 
      publishedAt: new Date().toISOString(),
    },
  });

    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 3",
      excerpt:"Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category3], 
      publishedAt: new Date().toISOString(),
    },
  });

    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 4",
      excerpt:"Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category4], 
      publishedAt: new Date().toISOString(),
    },
  });
  
    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 5",
      excerpt:"Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category5], 
      publishedAt: new Date().toISOString(),
    },
  });
  

    await payload.create({
    collection: "posts",
    data: {
      title: "Bài viết 6",
      excerpt:"Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              version: 1,
              direction: "ltr",
              format: "",
              indent: 0,
              children: [
                {
                  type: "text",
                  text: "Nhà trường quân sự đẩy mạnh cải cách, đơn giản hóa thủ tục hành chính nhằm nâng cao hiệu quả quản lý, phục vụ tốt hơn cho cán bộ, giảng viên và học viên.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
          ],
        },
      },
      categories: [category6], 
      publishedAt: new Date().toISOString(),
    },
  });

  await payload.create({
  collection: "posts",
  data: {
    title: "Hướng dẫn thực hiện Bình rèn tuần trong đơn vị",
    excerpt: "Trong công tác quản lý, giáo dục và rèn luyện bộ đội, bình rèn tuần là một nội dung quan trọng nhằm giúp mỗi cá nhân tự đánh giá, tự phê bình và lắng nghe nhận xét góp ý từ tập thể.",
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          // {
          //   type: "heading",
          //   version: 1,
          //   tag: "h2",
          //   direction: "ltr",
          //   format: "",
          //   indent: 0,
          //   children: [
          //     {
          //       type: "text",
          //       text: "Hướng dẫn thực hiện Bình rèn tuần trong đơn vị",
          //       version: 1,
          //       detail: 0,
          //       mode: "normal",
          //       style: "",
          //       format: 1, // bold
          //     },
          //   ],
          // },
          {
            type: "paragraph",
            version: 1,
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "Trong công tác quản lý, giáo dục và rèn luyện bộ đội, bình rèn tuần là một nội dung quan trọng nhằm giúp mỗi cá nhân tự đánh giá, tự phê bình và lắng nghe nhận xét góp ý từ tập thể. Qua đó, cấp trên có cơ sở nắm bắt tình hình, biểu dương, kịp thời chấn chỉnh những tồn tại trong đơn vị.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "paragraph",
            version: 1,
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "Để thống nhất cách làm, cán bộ và chiến sĩ thực hiện theo các bước sau:",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "heading",
            version: 1,
            tag: "h3",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "1. In và phát mẫu bình rèn",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            start: 1,
            tag: "ul",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "listitem",
                version: 1,
                value: 1,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Đại đội in sẵn mẫu phiếu bình rèn tuần (theo biểu mẫu đính kèm).",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 2,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Phát về cho từng tiểu đội để tổ chức thực hiện.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            version: 1,
            tag: "h3",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "2. Tổ chức bình rèn tại tiểu đội",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            start: 1,
            tag: "ul",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "listitem",
                version: 1,
                value: 1,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Từng cá nhân tự viết bản tự nhận xét, tự đánh giá ưu khuyết điểm của mình trong tuần.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 2,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Tập thể tiểu đội nhận xét bổ sung, góp ý cho từng đồng chí.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 3,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Tiểu đội trưởng tổng hợp, ký xác nhận.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            version: 1,
            tag: "h3",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "3. Nộp lại cho Đại đội",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            start: 1,
            tag: "ul",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "listitem",
                version: 1,
                value: 1,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Các tiểu đội thu toàn bộ phiếu bình rèn.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 2,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Gửi về Đại đội để tổng hợp, xác nhận và lưu hồ sơ.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            version: 1,
            tag: "h3",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "4. Tải mẫu phiếu bình rèn",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "paragraph",
            version: 1,
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "Để thuận tiện cho quá trình triển khai, đơn vị có thể tải mẫu phiếu bình rèn tuần theo đường dẫn dưới đây:",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "paragraph",
            version: 1,
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "📎 Tải mẫu phiếu bình rèn tuần (.docx)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "heading",
            version: 1,
            tag: "h3",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "text",
                text: "5. Một số lưu ý",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 1, // bold
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            start: 1,
            tag: "ul",
            direction: "ltr",
            format: "",
            indent: 0,
            children: [
              {
                type: "listitem",
                version: 1,
                value: 1,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Viết ngắn gọn, trung thực, đúng sự thật.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 2,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Nội dung tập trung vào ý thức chấp hành điều lệnh, kỷ luật, tác phong, đoàn kết nội bộ, nhiệm vụ được giao.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                value: 3,
                format: "",
                indent: 0,
                direction: "ltr",
                children: [
                  {
                    type: "text",
                    text: "Nộp đúng thời gian quy định để bảo đảm công tác quản lý.",
                    version: 1,
                    detail: 0,
                    mode: "normal",
                    style: "",
                    format: 1, // bold
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    categories: [category4], // Thay đổi category phù hợp
    publishedAt: new Date().toISOString(),
  },
});

await payload.create({
  collection: "posts",
  data: {
    title: "Hướng dẫn thực hiện Bình rèn tháng trong đơn vị",
    excerpt:
      "Bình rèn tháng là hoạt động quan trọng nhằm đánh giá kết quả rèn luyện, học tập và công tác của cán bộ, chiến sĩ trong đơn vị theo chu kỳ tháng. Đây là cơ sở để cấp ủy, chỉ huy nhận xét, xếp loại và đề ra biện pháp quản lý, giáo dục phù hợp.",
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          {
            type: "heading",
            version: 1,
            tag: "h2",
            direction: "ltr",
            children: [
              {
                type: "text",
                text: "Hướng dẫn thực hiện Bình rèn tháng trong đơn vị",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "paragraph",
            version: 1,
            direction: "ltr",
            children: [
              {
                type: "text",
                text: "Bình rèn tháng là hoạt động quan trọng nhằm đánh giá kết quả rèn luyện, học tập và công tác của cán bộ, chiến sĩ trong đơn vị theo chu kỳ tháng. Đây là cơ sở để cấp ủy, chỉ huy nhận xét, xếp loại và đề ra biện pháp quản lý, giáo dục phù hợp.",
                version: 1,
              },
            ],
          },
          {
            type: "paragraph",
            version: 1,
            children: [
              {
                type: "text",
                text: "Quy trình bình rèn tháng được thực hiện theo các bước sau:",
                version: 1,
              },
            ],
          },
          // 1. In và phát mẫu
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "1. In và phát mẫu bình rèn tháng",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            children: [
              {
                type: "listitem",
                version: 1,
                children: [
                  {
                    type: "text",
                    text: "Đại đội in sẵn bộ mẫu bình rèn tháng bao gồm:",
                    version: 1,
                  },
                ],
              },
              {
                type: "listitem",
                version: 1,
                children: [
                  { type: "text", text: "1. Phiếu đánh giá cá nhân.", version: 1 },
                ],
              },
              {
                type: "listitem",
                version: 1,
                children: [
                  { type: "text", text: "2. Biên bản sinh hoạt tiểu đội.", version: 1 },
                ],
              },
              {
                type: "listitem",
                version: 1,
                children: [
                  { type: "text", text: "3. Biên bản sinh hoạt lớp.", version: 1 },
                ],
              },
              {
                type: "listitem",
                version: 1,
                children: [
                  { type: "text", text: "4. Bảng tổng hợp điểm đánh giá từng cá nhân.", version: 1 },
                ],
              },
              {
                type: "listitem",
                version: 1,
                children: [
                  { type: "text", text: "Phát xuống cho các tiểu đội, lớp để tổ chức thực hiện.", version: 1 },
                ],
              },
            ],
          },
          // 2. Tổ chức bình rèn tại các cấp cơ sở
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "2. Tổ chức bình rèn tại các cấp cơ sở",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            children: [
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Cá nhân viết bản tự đánh giá, tự nhận xét.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Tiểu đội tổ chức họp, thảo luận, nhận xét, ghi vào biên bản sinh hoạt tiểu đội.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Lớp tổ chức sinh hoạt, tổng hợp nhận xét và đánh giá vào biên bản sinh hoạt lớp.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Lớp trưởng ký xác nhận, lập bảng tổng hợp điểm đánh giá từng cá nhân trong lớp.", version: 1 },
                ],
              },
            ],
          },
          // 3. Đại đội xác nhận
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "3. Đại đội xác nhận và lập tờ trình",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            children: [
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Các lớp nộp đầy đủ hồ sơ về Đại đội (phiếu cá nhân, biên bản tiểu đội, biên bản lớp, bảng điểm).", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Đại đội tổ chức sinh hoạt, lập biên bản sinh hoạt Đại đội.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Chính trị viên/Đại đội trưởng ký xác nhận và lập tờ trình báo cáo kết quả bình rèn tháng.", version: 1 },
                ],
              },
            ],
          },
          // 4. Trình Tiểu đoàn
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "4. Trình Tiểu đoàn",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            children: [
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Đại đội nộp hồ sơ bình rèn tháng kèm theo:", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "• Tờ trình.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "• Biên bản sinh hoạt Đại đội.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "• Hồ sơ bình rèn từ các tiểu đội, lớp.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Báo cáo, trình lên Tiểu đoàn để xem xét, xác nhận và lưu.", version: 1 },
                ],
              },
            ],
          },
          // 5. Tải mẫu
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "5. Tải mẫu biểu bình rèn tháng",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "📎 Tải mẫu hồ sơ bình rèn tháng (.docx)",
                version: 1,
              },
            ],
            version: 0,
          },
          // 6. Một số lưu ý
          {
            type: "heading",
            version: 1,
            tag: "h3",
            children: [
              {
                type: "text",
                text: "6. Một số lưu ý",
                version: 1,
                format: 1,
              },
            ],
          },
          {
            type: "list",
            version: 1,
            listType: "bullet",
            children: [
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Nội dung đánh giá cần cụ thể, trung thực, sát thực tế.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Biên bản phải đầy đủ chữ ký của tập thể và cán bộ phụ trách.", version: 1 },
                ],
              },
              {
                type: "listitem",
                children: [
                  { type: "text", text: "Hồ sơ phải được sắp xếp khoa học, nộp đúng thời gian quy định.", version: 1 },
                ],
              },
            ],
          },
        ],
      },
    },
    categories: [4], // thay category phù hợp
    publishedAt: new Date().toISOString(),
  },
});

await payload.create({
  collection: "posts",
  data: {
    title: "Hướng dẫn thực hiện Bình rèn học kỳ trong đơn vị",
    excerpt:
      "Bình rèn học kỳ là bước tổng kết quan trọng, dựa trên kết quả bình rèn của các tháng để đánh giá và phân loại kết quả rèn luyện của học viên trong suốt một học kỳ.",
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          // Tiêu đề
          {
            type: "heading",
            version: 1,
            tag: "h2",
            children: [
              {
                type: "text",
                text: "Hướng dẫn thực hiện Bình rèn học kỳ trong đơn vị",
                version: 1,
              },
            ],
          },
          // Mở đầu
          {
            type: "paragraph",
            version: 1,
            children: [
              {
                type: "text",
                text: "Bình rèn học kỳ là bước tổng kết quan trọng, dựa trên kết quả bình rèn của các tháng để đánh giá và phân loại kết quả rèn luyện của học viên trong suốt một học kỳ.",
                version: 1,
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Hoạt động này giúp cấp ủy, chỉ huy các cấp có cái nhìn tổng thể về quá trình tu dưỡng, rèn luyện của học viên, từ đó đưa ra nhận xét, xếp loại và báo cáo lên nhà trường.",
                version: 1,
              },
              
            ],
            version: 0,
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "Quy trình bình rèn học kỳ được thực hiện như sau:", version: 1 }],
            version: 0,
          },

          // 1. Căn cứ và tài liệu sử dụng
          {
            type: "heading",
            tag: "h3",
            children: [{ type: "text", text: "1. Căn cứ và tài liệu sử dụng", version: 1 }],
            version: 0,
          },
          
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Kết quả bình rèn của từng tháng trong học kỳ.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Biên bản sinh hoạt của các cấp (tiểu đội, lớp, đại đội, tiểu đoàn).", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Điểm đánh giá cá nhân đã được tổng hợp theo từng tháng.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tờ trình báo cáo kết quả bình rèn học kỳ.", version: 1 }] },
            ],
            version: 0,
          },

          // 2. Tổ chức bình rèn theo cấp
          {
            type: "heading",
            tag: "h3",
            children: [{ type: "text", text: "2. Tổ chức bình rèn theo cấp", version: 1 }],
            version: 0,
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "a) Lớp", version: 1, format: 1 }],
            version: 0,
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Tổng hợp kết quả bình rèn từng tháng của từng học viên.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tổ chức sinh hoạt lớp, thảo luận, nhận xét, đánh giá và phân loại học viên.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lập biên bản sinh hoạt lớp và bảng điểm tổng hợp học kỳ.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lớp trưởng ký xác nhận, nộp cho Đại đội.", version: 1 }] },
            ],
            version: 0,
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "b) Đại đội", version: 1, format: 1 }],
            version: 0,
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Thu nhận đầy đủ hồ sơ từ các lớp.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tổ chức sinh hoạt toàn Đại đội, đánh giá, phân loại tập thể và cá nhân.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lập biên bản sinh hoạt Đại đội và tờ trình báo cáo kết quả bình rèn học kỳ.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Đại đội trưởng/Chính trị viên xác nhận.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Nộp hồ sơ lên Tiểu đoàn.", version: 1 }] },
            ],
            version: 0,
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "c) Tiểu đoàn", version: 1, format: 1 }],
            version: 0,
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Tiếp nhận hồ sơ từ các Đại đội.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tổ chức họp xét, đánh giá, phân loại kết quả rèn luyện học kỳ.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lập biên bản sinh hoạt Tiểu đoàn, xác nhận kết quả.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lập tờ trình gửi Nhà trường.", version: 1 }] },
            ],
            version: 0,
          },
          {
            type: "paragraph",
            children: [{ type: "text", text: "d) Nhà trường", version: 1, format: 1 }],
            version: 0,
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Nhận hồ sơ bình rèn học kỳ từ các Tiểu đoàn.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tổ chức xét duyệt, phê duyệt và ban hành kết quả rèn luyện học kỳ chính thức.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lưu hồ sơ theo quy định.", version: 1 }] },
            ],
            version: 0,
          },

          // 3. Hồ sơ
          {
            type: "heading",
            tag: "h3",
            children: [{ type: "text", text: "3. Hồ sơ bình rèn học kỳ gồm có", version: 1 }],
            version: 0,
          },
          {
            type: "list",
            listType: "number",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Phiếu đánh giá cá nhân (theo kết quả từng tháng).", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Biên bản sinh hoạt lớp, Đại đội, Tiểu đoàn.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Bảng điểm tổng hợp học kỳ của cá nhân.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Tờ trình báo cáo kết quả bình rèn học kỳ.", version: 1 }] },
            ],
            version: 0,
          },

          // 4. Lưu ý
          {
            type: "heading",
            tag: "h3",
            children: [{ type: "text", text: "4. Một số lưu ý", version: 1 }],
            version: 0
          },
          {
            type: "list",
            listType: "bullet",
            children: [
              { type: "listitem", children: [{ type: "text", text: "Cần bám sát kết quả bình rèn tháng để bảo đảm tính khách quan.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Đánh giá phải toàn diện, công khai, dân chủ, phản ánh đúng quá trình rèn luyện.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Hồ sơ nộp theo đúng trình tự cấp bậc: Lớp → Đại đội → Tiểu đoàn → Nhà trường.", version: 1 }] },
              { type: "listitem", children: [{ type: "text", text: "Lưu giữ hồ sơ cẩn thận để phục vụ công tác quản lý lâu dài.", version: 1 }] },
            ],
            version: 0,
          },

          // Tải file
          {
            type: "paragraph",
            children: [
              { type: "text", text: "📎 Đơn vị có thể chuẩn bị bộ mẫu hồ sơ bình rèn học kỳ (.docx) gồm: Phiếu cá nhân, Biên bản sinh hoạt các cấp, Bảng điểm tổng hợp, Tờ trình.", version: 1 },
            ],
            version: 0
          },
        ],
      },
    },
    categories: [category4], // thay categoryId phù hợp
    publishedAt: new Date().toISOString(),
  },
});






//   // create media 
//   const path = require('path');

// // Tạo media record cho file mẫu phiếu bình rèn tuần
// const mediaFile = await payload.create({
//   collection: "media",
//   data: {
//     alt:  "Mẫu phiếu bình rèn tuần cho đơn vị quân đội",
//     caption: {
    
//         root: {
//           type: "root",
//           format: "",
//           indent: 0,
//           version: 1,
//           direction: "ltr",
//           children: [
//             {
//               type: "paragraph",
//               version: 1,
//               direction: "ltr",
//               format: "",
//               indent: 0,
//               children: [
//                 {
//                   type: "text",
//                   text: "Tài liệu hướng dẫn chi tiết về cách thực hiện bình rèn tuần trong các đơn vị quân đội. File bao gồm biểu mẫu chuẩn và hướng dẫn sử dụng.",
//                   version: 1,
//                   detail: 0,
//                   mode: "normal",
//                   style: "",
//                   format: 0,
//                 },
//               ],
//             },
//           ],
//         },
//       },
      
    
//   },
//   filePath: path.join(__dirname, 'public', 'media', 'Noi-dung-mau-binh-ren-tuan.docx'), // Đường dẫn tới file .docx
// });

  
};
