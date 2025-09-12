import { Config } from "payload";
// import path from "path";


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
  const tenant4 = await payload.create({
    collection: "tenants",
    data:{ 
      name: "Phòng chính trị",
      slug: "phong-chinh-tri",
      domain: "phongct.localhost",
      level: "department",
    }
  });
  const tenant5 = await payload.create({
    collection: "tenants",
    data:{ 
      name: "Phòng khoa học quân sự",
      slug: "phong-khoa-hoc-quan-su",
      domain: "phongkhqs.localhost",
      level: "department",
    }
  });
   const tenant6 = await payload.create({
    collection: "tenants",
    data:{ 
      name: "Ban khảo thí",
      slug: "phong-khoa-hoc-quan-su",
      domain: "phongkhqs.localhost",
      level: "division",
    }
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
        {
          roles: ["tenant-admin"],
          tenant: tenant4.id,
        },
        {
          roles: ["tenant-admin"],
          tenant: tenant5.id,
        },
        {
          roles: ["tenant-admin"],
          tenant: tenant6.id,
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
      title: "Các loại đầu sổ ",
      name: "Type 1",
      tenants: [tenant1.id],
    },
  });

  const category2 = await payload.create({
    collection: "categories",
    data :{
      title: "Các loại đầu sổ",
      name: "Type 2",
      tenants: [tenant4.id],
    },
  });

  const category3 = await payload.create({
    collection: "categories",
    data :{
      title: "Các loại đầu sổ",
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
      title: "Các loại đầu sổ",
      name: "Type 5",
      tenants: [tenant3.id],
    },
  });

  const category6 = await payload.create({
    collection: "categories",
    data :{
      title: "Thể loại F",
      name: "Type 6",
      tenants: [tenant3.id],
    },
  });

  // seed media
//   const file = await payload.create({
//   collection: "media",
//   filePath: path.resolve(process.cwd(), "public/media/binhren.docx"),
//   data: {
//     alt: "Bình rèn docx",
//   },
// });


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
    title: "Quy định chung",
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
                text:
                  "Việc xếp loại rèn luyện học kỳ của học sinh, sinh viên được căn cứ theo kết quả rèn luyện từng tháng trong học kỳ, cụ thể như sau:",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0,
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
                text: "A. Loại Tốt",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version : 1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Có từ 4 tháng trở lên trong học kỳ đạt loại Tốt.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Tháng cuối học kỳ bắt buộc phải đạt loại Tốt.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Các tháng còn lại đạt loại Khá trở lên.",
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
            ],
          },
          {
            type: "paragraph",
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "text",
                text: "B. Loại Khá",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version: 1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Có từ 4 tháng trở lên trong học kỳ đạt loại Khá trở lên.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Hai tháng cuối học kỳ phải đạt loại Khá.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Các tháng còn lại đạt loại Trung bình trở lên.",
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
            ],
          },
          {
            type: "paragraph",
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "text",
                text: "C. Loại Trung bình Khá",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version: 1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Có từ 3 tháng trở lên trong học kỳ đạt loại Trung bình Khá trở lên.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Tháng cuối học kỳ phải đạt loại Trung bình Khá.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Các tháng còn lại đạt loại Trung bình.",
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
            ],
          },
          {
            type: "paragraph",
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "text",
                text: "D. Loại Trung bình",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version: 1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Có từ 4 tháng trở lên trong học kỳ đạt loại Trung bình trở lên.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Hai tháng cuối học kỳ phải đạt loại Trung bình.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Không vi phạm khuyết điểm đến mức bị xử lý kỷ luật với hình thức cảnh cáo trở lên.",
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
            ],
          },
          {
            type: "paragraph",
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "text",
                text: "E. Loại Yếu",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version:1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Các tháng trong học kỳ chủ yếu đạt loại Trung bình.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Có 1 tháng bị xếp loại rèn luyện Kém.",
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
            ],
          },
          {
            type: "paragraph",
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "text",
                text: "F. Loại Kém",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1,
              },
            ],
          },
          {
            type: "list",
            listType: "bullet",
            version: 1,
            children: [
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Các tháng trong học kỳ chủ yếu đạt loại Trung bình.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Có 1 tháng xếp loại rèn luyện Kém.",
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
              {
                type: "listitem",
                value: 0,
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text:
                          "Có vi phạm kỷ luật, tuy chưa đến mức bị buộc thôi học.",
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
            ],
          },
        ],
      },
    },
    categories: [category4], // bạn thay bằng ID hoặc biến danh mục phù hợp
    publishedAt: new Date().toISOString(),
  },
});

  
  await payload.create({
  collection: "posts",
  data: {
    title: "Bình rèn tuần",
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
                text: "(File đính kèm)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          }
        ]
      }
    },
    categories: [category4], 
    publishedAt: new Date().toISOString()
  }
});

await payload.create({
  collection: "posts",
  data: {
    title: "Bình rèn tháng",
    excerpt: "Các nội dung và biểu mẫu phục vụ công tác bình rèn luyện hàng tháng.",
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
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "1. Phiếu tự chấm điểm",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Học viên thực hiện tự đánh giá kết quả rèn luyện của bản thân trong tuần theo mẫu phiếu quy định.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Phiếu tự chấm điểm)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "2. Sinh hoạt tiểu đội",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Các thành viên trong tiểu đội cùng tham gia sinh hoạt, góp ý và đánh giá lẫn nhau dựa trên các tiêu chí cụ thể.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Nội dung sinh hoạt được ghi nhận đầy đủ.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Biên bản sinh hoạt tiểu đội)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "3. Biên bản sinh hoạt lớp",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Lớp trưởng chủ trì sinh hoạt lớp, tổng hợp ý kiến từ các tiểu đội.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Đánh giá chung tình hình rèn luyện của tập thể và từng cá nhân.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Biên bản sinh hoạt lớp)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "4. Biên bản sinh hoạt đại đội",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Cấp quản lý đại đội tổ chức sinh hoạt, tổng hợp kết quả bình xét từ các lớp.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Góp ý và điều chỉnh điểm rèn luyện nếu cần thiết.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Biên bản sinh hoạt đại đội)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "5. Biên bản sinh hoạt chi bộ",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Với các học viên là Đảng viên, việc sinh hoạt chi bộ là bắt buộc.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Chi bộ tiến hành đánh giá rèn luyện của từng đảng viên học viên trong tuần.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Biên bản sinh hoạt chi bộ)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "6. Tờ trình",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Sau khi hoàn tất các bước trên, đại diện các cấp lập tờ trình báo cáo kết quả bình rèn tuần gửi về đơn vị quản lý.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Tờ trình tổng hợp kết quả bình rèn tuần)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          },

          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "7. Tổng hợp điểm hàng tuần",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "bold",
                format: 1
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Dựa trên phiếu tự chấm điểm, ý kiến sinh hoạt và các biên bản, ban cán sự lớp phối hợp với quản lý đại đội tổng hợp điểm rèn luyện của từng học viên trong tuần.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• Bảng tổng hợp được lưu trữ và dùng làm căn cứ để đánh giá rèn luyện theo tháng và học kỳ.",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "",
                format: 0
              }
            ]
          },
          {
            type: "paragraph",
            version: 1,
            indent: 0,
            direction: "ltr",
            format: "",
            children: [
              {
                type: "text",
                text: "• (Kèm theo file: Bảng tổng hợp điểm rèn luyện hàng tuần)",
                version: 1,
                detail: 0,
                mode: "normal",
                style: "italic",
                format: 2
              }
            ]
          }
        ]
      }
    },
    categories: [category4], 
    publishedAt: new Date().toISOString()
  }
});


  await payload.create({
    collection: "posts",
    data: {
      title: "Bình rèn học kỳ",
      content: {
        root: {
          type: "root",
          version: 1,
          indent: 0,
          direction: "ltr",
          format: "",
          children: [
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "1. Phiếu tự chấm điểm",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Học viên tự đánh giá toàn bộ quá trình rèn luyện trong học kỳ dựa trên các tiêu chí quy định.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Phiếu tự chấm điểm là căn cứ đầu tiên để các cấp xét duyệt, đánh giá.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Phiếu tự chấm điểm học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 2. Biên bản sinh hoạt lớp
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "2. Biên bản sinh hoạt lớp",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Lớp tổ chức họp toàn thể học viên để thảo luận, góp ý, đánh giá tinh thần rèn luyện và ý thức tổ chức kỷ luật của từng cá nhân trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt được lập thành biên bản.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt lớp)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 3. Biên bản sinh hoạt đại đội
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "3. Biên bản sinh hoạt đại đội",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Đại đội tổng hợp kết quả bình xét từ các lớp, tổ chức họp đánh giá chung và đề xuất mức xếp loại rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Có thể điều chỉnh điểm nếu phát hiện bất thường hoặc có khiếu nại chính đáng.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt đại đội)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 4. Biên bản sinh hoạt chi bộ
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "4. Biên bản sinh hoạt chi bộ",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Chi bộ Đảng tổ chức sinh hoạt định kỳ và đánh giá mức độ rèn luyện, ý thức tu dưỡng, phẩm chất chính trị của đảng viên là học viên trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt chi bộ là một trong những căn cứ để đánh giá rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt chi bộ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 5. Tờ trình
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "5. Tờ trình",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Sau khi hoàn thành quá trình bình xét ở các cấp, ban cán sự lập tờ trình đề xuất xếp loại rèn luyện gửi về đại đội và đơn vị quản lý.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Tờ trình cần ghi rõ quá trình, minh chứng, ý kiến thống nhất của tập thể.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Tờ trình đề xuất kết quả bình rèn học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 6. Tổng hợp điểm hàng tháng
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "6. Tổng hợp điểm hàng tháng",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả điểm rèn luyện của từng tháng trong học kỳ được tổng hợp lại để làm cơ sở xét loại rèn luyện cuối kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Việc tổng hợp cần đảm bảo chính xác, đối chiếu với các biên bản sinh hoạt, phiếu tự chấm điểm và thực tế rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Bảng tổng hợp điểm rèn luyện hàng tháng)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // Lưu ý
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "✅ Lưu ý",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "Toàn bộ hồ sơ, biên bản và tài liệu liên quan đến quá trình bình rèn học kỳ phải được lưu trữ đầy đủ, có chữ ký xác nhận của các bên liên quan và chịu trách nhiệm trước tập thể.",
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
      title: "Bình rèn năm học",
      content: {
        root: {
          type: "root",
          version: 1,
          indent: 0,
          direction: "ltr",
          format: "",
          children: [
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "1. Phiếu tự chấm điểm",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Học viên tự đánh giá toàn bộ quá trình rèn luyện trong học kỳ dựa trên các tiêu chí quy định.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Phiếu tự chấm điểm là căn cứ đầu tiên để các cấp xét duyệt, đánh giá.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Phiếu tự chấm điểm học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 2. Biên bản sinh hoạt lớp
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "2. Biên bản sinh hoạt lớp",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Lớp tổ chức họp toàn thể học viên để thảo luận, góp ý, đánh giá tinh thần rèn luyện và ý thức tổ chức kỷ luật của từng cá nhân trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt được lập thành biên bản.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt lớp)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 3. Biên bản sinh hoạt đại đội
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "3. Biên bản sinh hoạt đại đội",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Đại đội tổng hợp kết quả bình xét từ các lớp, tổ chức họp đánh giá chung và đề xuất mức xếp loại rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Có thể điều chỉnh điểm nếu phát hiện bất thường hoặc có khiếu nại chính đáng.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt đại đội)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 4. Biên bản sinh hoạt chi bộ
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "4. Biên bản sinh hoạt chi bộ",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Chi bộ Đảng tổ chức sinh hoạt định kỳ và đánh giá mức độ rèn luyện, ý thức tu dưỡng, phẩm chất chính trị của đảng viên là học viên trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt chi bộ là một trong những căn cứ để đánh giá rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt chi bộ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 5. Tờ trình
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "5. Tờ trình",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Sau khi hoàn thành quá trình bình xét ở các cấp, ban cán sự lập tờ trình đề xuất xếp loại rèn luyện gửi về đại đội và đơn vị quản lý.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Tờ trình cần ghi rõ quá trình, minh chứng, ý kiến thống nhất của tập thể.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Tờ trình đề xuất kết quả bình rèn học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 6. Tổng hợp điểm hàng tháng
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "6. Tổng hợp điểm hàng tháng",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả điểm rèn luyện của từng tháng trong học kỳ được tổng hợp lại để làm cơ sở xét loại rèn luyện cuối kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Việc tổng hợp cần đảm bảo chính xác, đối chiếu với các biên bản sinh hoạt, phiếu tự chấm điểm và thực tế rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Bảng tổng hợp điểm rèn luyện hàng tháng)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // Lưu ý
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "✅ Lưu ý",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "Toàn bộ hồ sơ, biên bản và tài liệu liên quan đến quá trình bình rèn học kỳ phải được lưu trữ đầy đủ, có chữ ký xác nhận của các bên liên quan và chịu trách nhiệm trước tập thể.",
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
      title: "Bình rèn khóa học",
      content: {
        root: {
          type: "root",
          version: 1,
          indent: 0,
          direction: "ltr",
          format: "",
          children: [
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "1. Phiếu tự chấm điểm",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Học viên tự đánh giá toàn bộ quá trình rèn luyện trong học kỳ dựa trên các tiêu chí quy định.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Phiếu tự chấm điểm là căn cứ đầu tiên để các cấp xét duyệt, đánh giá.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Phiếu tự chấm điểm học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 2. Biên bản sinh hoạt lớp
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "2. Biên bản sinh hoạt lớp",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Lớp tổ chức họp toàn thể học viên để thảo luận, góp ý, đánh giá tinh thần rèn luyện và ý thức tổ chức kỷ luật của từng cá nhân trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt được lập thành biên bản.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt lớp)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 3. Biên bản sinh hoạt đại đội
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "3. Biên bản sinh hoạt đại đội",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Đại đội tổng hợp kết quả bình xét từ các lớp, tổ chức họp đánh giá chung và đề xuất mức xếp loại rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Có thể điều chỉnh điểm nếu phát hiện bất thường hoặc có khiếu nại chính đáng.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt đại đội)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 4. Biên bản sinh hoạt chi bộ
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "4. Biên bản sinh hoạt chi bộ",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Chi bộ Đảng tổ chức sinh hoạt định kỳ và đánh giá mức độ rèn luyện, ý thức tu dưỡng, phẩm chất chính trị của đảng viên là học viên trong học kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả sinh hoạt chi bộ là một trong những căn cứ để đánh giá rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Biên bản sinh hoạt chi bộ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 5. Tờ trình
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "5. Tờ trình",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Sau khi hoàn thành quá trình bình xét ở các cấp, ban cán sự lập tờ trình đề xuất xếp loại rèn luyện gửi về đại đội và đơn vị quản lý.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Tờ trình cần ghi rõ quá trình, minh chứng, ý kiến thống nhất của tập thể.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Tờ trình đề xuất kết quả bình rèn học kỳ)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // 6. Tổng hợp điểm hàng tháng
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "6. Tổng hợp điểm hàng tháng",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Kết quả điểm rèn luyện của từng tháng trong học kỳ được tổng hợp lại để làm cơ sở xét loại rèn luyện cuối kỳ.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• Việc tổng hợp cần đảm bảo chính xác, đối chiếu với các biên bản sinh hoạt, phiếu tự chấm điểm và thực tế rèn luyện.",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "",
                  format: 0,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "• (Kèm theo file: Bảng tổng hợp điểm rèn luyện hàng tháng)",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "italic",
                  format: 2,
                },
              ],
            },

            // Lưu ý
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "✅ Lưu ý",
                  version: 1,
                  detail: 0,
                  mode: "normal",
                  style: "bold",
                  format: 1,
                },
              ],
            },
            {
              type: "paragraph",
              version: 1,
              indent: 0,
              direction: "ltr",
              format: "",
              children: [
                {
                  type: "text",
                  text: "Toàn bộ hồ sơ, biên bản và tài liệu liên quan đến quá trình bình rèn học kỳ phải được lưu trữ đầy đủ, có chữ ký xác nhận của các bên liên quan và chịu trách nhiệm trước tập thể.",
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

};
export default seed;
