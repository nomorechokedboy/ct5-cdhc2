// payload.config.ts
import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import { Categories } from "./collections/Categories"
import { Pages } from "./collections/Pages"
import { Posts } from "./collections/Posts"
import { Tenants } from "./collections/Tenants"
import Users from "./collections/Users"
import { Media } from "./collections/Media"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import { isSuperAdmin } from "./access/isSuperAdmin"
import type { Config } from "./payload-types"
import { getUserTenantIDs } from "./utilities/getUserTenantIDs"
import { seed } from "./seed"
import { type Payload } from "payload"
import { en } from '@payloadcms/translations/languages/en'
import { vi } from '@payloadcms/translations/languages/vi'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: "users",
    components: {
      logout: { Button: "@/components/logout-button" },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Cấu hình localization cho nội dung
  localization: {
    locales: [
      {
        label: 'Tiếng Việt',
        code: 'vi'
      },
      {
        label: 'English',
        code: 'en'
      }
    ],
    defaultLocale: 'vi',
    fallback: true
  },

  // Cấu hình i18n cho Admin UI
  i18n: {
    // Ngôn ngữ fallback mặc định
    fallbackLanguage: 'en',
    
    // Các ngôn ngữ được hỗ trợ
    supportedLanguages: {
      en: en as any,
      vi: vi as any,
    },

    translations: {
      // Translations cho tiếng Việt
      vi: {
        // Override hoặc thêm translations mới
        general: {
          dashboard: 'Bảng điều khiển',
          logout: 'Đăng xuất',
          account: 'Tài khoản',
        },
        
        // Translations cho authentication
        authentication: {
          email: 'Email',
          password: 'Mật khẩu',
          login: 'Đăng nhập',
        },
        
        // Translations cho các actions
        actions: {
          save: 'Lưu',
          cancel: 'Hủy',
          delete: 'Xóa',
          edit: 'Chỉnh sửa',
          create: 'Tạo mới',
        },
      },
    },
   

  },


  collections: [Pages, Users, Tenants, Categories, Posts, Media],

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
    },
  }),

  onInit: async (args) => {
    if (process.env.SEED_DB) {
      await seed(args)
    }
  },

  editor: lexicalEditor({}),

  graphQL: {
    schemaOutputFile: path.resolve(dirname, "generated-schema.graphql"),
  },

  secret: process.env.PAYLOAD_SECRET as string,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  plugins: [
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) {
              return true
            }
            return getUserTenantIDs(req.user).length > 0
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],

  endpoints: [
    {
      path: "/public/tenants",
      method: "get",
      handler: async (req) => {
        const tenants = await req.payload.find({
          collection: "tenants",
          limit: 1000,
          overrideAccess: true,
        })

        return Response.json(tenants)
      },
    }
  ],
})
